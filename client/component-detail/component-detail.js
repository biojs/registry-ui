angular.module('registry')

.controller('DetailController', function($scope, $route, $routeParams, $location, $http, $sce, Component) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  
  $scope.notDisplayedInColumn = $scope.$parent.filter.notDisplayedInColumn;

  $scope.frameLoaded = function(id){
    var demoFrame = document.getElementById(id); 
  };

  $scope.changeDemo = function(){
    var url = "http://workmen.biojs.net/demo/" + $scope.c.name + "/" + $scope.c.selectedSnip;
    $scope.c.firstSnipURL = url;
  }

  // TODO: remove listener when the view gets destroyed
  window.addEventListener("message", receiveMessage, false);
  function log(logger,eventName,data){
    if(data !== undefined){
      text = eventName  + " triggered with " + removeCircularRefs(data);
    }
    message = document.createElement("div");
    message.textContent = text;
  
    // insert the div always at the top
    if(logger.childNodes.length > 0){
      logger.insertBefore(message,logger.firstChild);
    }else{
      logger.appendChild(message);
    }
  
    // cleanup
    if(logger.childNodes.length > 10){
      logger.removeChild(logger.lastChild);
    }
  }

  function removeCircularRefs(obj){
    return JSON.stringify(obj, function( key, value) {
      if( key == 'parent') { return value.id;}
      else {return value;}
    })
  }

  function receiveMessage(event)
  {
    console.log("cors", event.data);
    log(document.getElementById("evt-console"), event.data.name, event.data.data);
  }

  // get package name from the URL
  var name = $route.current.params.name;
  name = name.trim().toLowerCase();

  function loadPackage(name,scope,sce){
    components = scope.$parent.components;
    var packIndex = getPackage(name);
    if(packIndex < 0 ){
         console.log("Package " +name+  " not found.");
    }else{
      scope.c = components[packIndex];
    }
  }

  function getPackage(name,scope){
    for(var index in components){
      // search for package - probably
      // there is a more efficient way
      if(components[index].name === name){
        return index;
      }
    }
    return -1;
  }
 

  function getReadme(pkg){
  
    scope = $scope;
     //console.log("received readme:" +scope.c.readmeSrc);
     $http.get(scope.c.readmeSrc)
        .success(function(response) {
  
         response = response.toString().substring(1,response.length - 1);
  
          // workaround to translated escaped new lines
          response = response.split("\\n").join("\n");
  
          response = response.replace(/\\'/g, "'");
          response = response.replace(/\\"/g, '"');
  
          var html = marked( response );

          var regex = /src="((?!http).*?)(?=")/mg;
          html = html.replace(regex,function(match){
            return 'src="' + scope.c.github.raw_url + match.substring(5);
          });

          scope.c.readme = $sce.trustAsHtml(html);
         })
         .error(function(response){
             console.log("error");
         });
  }

  Component.single(name).then(function(pkg){
    $scope.c = pkg;

    // set other default values
    if(pkg.latest.sniper){
      $scope.c.selectedSnip = $scope.c.latest.sniper.first;
    }

    getReadme(pkg);
  });

  //$scope.$parent.components.promise.finally(function(){
});

// callback for frames
angular.module('registry')
.directive('iframeOnload', [function(){
return {
    scope: {
        callBack: '&iframeOnload'
    },
    link: function(scope, element, attrs){
        element.on('load', function(){
            return scope.callBack();
        })
    }
}}])

