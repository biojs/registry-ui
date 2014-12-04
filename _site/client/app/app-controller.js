angular.module('registry').controller('AppController', function ($scope, $route, $routeParams, $location, Component, ComponentFilter, $rootScope) {


//	$scope.$watchCollection("components", updateDisplayed); // Why was this here?

	$scope.filter = new ComponentFilter();
	$scope.components = [];
	$scope.layout = 'table';
	$scope.view = 'list';

	var query = Component.query();
	query.then(function(c){
    $scope.components = c;
    $scope.components.promise = query;
    $scope.displayedComponents = $scope.components.filter($scope.filter.match.bind($scope.filter));
  });

	$scope.displayedComponents = [];

	//// How to go to a specific detail page
	//
	$scope.switchView = function (name) {
		$location.path("detail/" + name);
    $scope.view = 'detail';
	};

  $rootScope.$on('$routeChangeSuccess', function(ev,data) {   
    // TODO: very,very dirty. remove me
    if(data.loadedTemplateUrl == "component-detail/component-detail.html"){
      $scope.view = 'detail';
    }else{
      $scope.view = 'list';
    }
   })

	//// Show components that match the current filter
	//
	$scope.$watch("filter", function updateDisplayed() {
    $scope.displayedComponents = $scope.components.filter($scope.filter.match.bind($scope.filter));
	}, true);

  $scope.setLayout = function(name){
    $scope.layout = name;
  }
	//// Go back to table view on filter change
	//
	$scope.$watch("filter", function updateDisplayed(newFilter, oldFilter) {
		if ($location.path().indexOf("/detail") >= 0 && !angular.equals(newFilter, oldFilter)) {
			$location.path("/");
		}
	}, true);

});
