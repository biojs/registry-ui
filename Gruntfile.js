module.exports = function(grunt) {
  grunt.initConfig({
    protractor: {
      options: {
        configFile: "node_modules/protractor/referenceConf.js", 
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
     your_target: {
          options: {
            configFile: "./protractor/conf.js", // Target-specific config file
            args: {} // Target-specific arguments
          }
      },
    },
    watch: {
      scripts: {
        files: ['client/**/*.js', 'client/**/*.html',
        'protractor/**/*.js'],
        tasks: ['protractor'],
        options: {
          spawn: false,
          event: ['all'],
          livereload: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-protractor-runner');
}
