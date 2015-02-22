var fs = require('fs');
var cheerio = require('cheerio');
var gulp = require('gulp');
var q = require('bluebird');
var mkdirp = require('mkdirp');
var del = require('rimraf');

// all the fancy gulp stuff
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var concat = q.promisify(require('concat-files'));

var outFolder = "prod";
var out = __dirname + "/" + outFolder + "/";

var paths = {
  scripts: ['concat/libs.js'],
  angular: ['concat/angular.js'],
  styles: ['css/**/*.css', 'lib/**/*.css'],
  html: ['index.html', 'angular/**/*.html'],
  images: ['img/**/*.{png,svg,jpg,ico}'],
  other: ['lib/bootstrap/dist/fonts/*', 'lib/angular/angular.min.{js,js.map}', 'lib/*.map'],
};

gulp.task('init', function() {
  del.sync(out);
  mkdirp.sync(out);
  // TODO: ignore files here
  //return gulp.src(['**/*'], { base: './' }).pipe(gulp.dest(out));
});

// TODO: add map files
gulp.task('concat', ["init"], function(cb) {
  var mainName = "/index.html";
  var mainFile = __dirname + mainName;
  var types = ["libs", "angular"];
  var concatFolder = "concat";
  var minFolder = out + "/" + concatFolder + "/";

  var $ = cheerio.load(fs.readFileSync(mainFile, "utf8"));

  mkdirp.sync(minFolder);

  var ps = types.map(function(t) {
    var filesSrc = $("script[bundler=" + t + "]");
    var files = filesSrc.map(function(k, el) {
      var src = el.attribs.src;
      if (src.indexOf("config.js") >= 0) {
        src = src.replace("config.js", "config.js.prod");
      }
      return src;
    }).get();
    // remove from DOM
    filesSrc.before("<script src='" + concatFolder + "/" + t + ".js'>");
    filesSrc.remove();
    return concat(files, minFolder + t + ".js");
  });

  // ship minified version of angular
  var angularRes = $("script[bundler-min=angular]");
  angularRes.attr("src", angularRes.attr("src").replace("angular.js", "angular.min.js"));
  angularRes.attr("bundler-min", null);

  q.all(ps).then(function() {
    fs.writeFile(out + mainName, $.html(), cb);
  });
});

gulp.task('minify-js', ["concat"], function() {
  return gulp.src(paths.scripts, {
      cwd: out,
      base: out
    })
    .pipe(sourcemaps.init())
    .pipe(uglify({
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(out));
});

gulp.task('minify-angular', ["concat"], function() {
  return gulp.src(paths.angular, {
      cwd: out,
      base: out
    })
    .pipe(sourcemaps.init())
    .pipe(uglify({
      mangle: false
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(out));
});

gulp.task('minify-html', ["init"], function() {
  var opts = {
    conditionals: true,
    spare: true,
  };
  return gulp.src(paths.html, {
      base: "./"
    })
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(out));
});

// TODO: remove comments
gulp.task('minify-index', ["concat"], function() {
  var opts = {
    conditionals: true,
    spare: true,
  };
  return gulp.src("index.html", {
      cwd: out
    })
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(out));
});

gulp.task('minify-css', ["init"], function() {
  return gulp.src(paths.styles, {
      base: "./"
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest(out));
});

// TODO: really minify images here
gulp.task('minify-img', ['init'], function() {
  return gulp.src(paths.images, {
      base: "./"
    })
    .pipe(gulp.dest(out));
});

gulp.task('copy-other', ['init'], function() {
  return gulp.src(paths.other, {
      base: "./"
    })
    .pipe(gulp.dest(out));
});


// TODO: remove unnecessary files from prod
gulp.task("default", ["concat", "minify-html", "minify-js","minify-angular", "minify-css", "copy-other", "minify-img", "minify-index"]);
