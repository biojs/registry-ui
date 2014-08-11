angular.module('registry').controller('AppController', function ($scope, $route, $routeParams, $location, Component, ComponentFilter) {


//	$scope.$watchCollection("components", updateDisplayed); // Why was this here?

	$scope.filter = new ComponentFilter();
	$scope.components = Component.query();
	$scope.layout = 'table';
	$scope.displayedComponents = [];

	//// How to go to a specific detail page
	//
	$scope.switchView = function (name) {
		$location.path("detail/" + name);
	};

	//// Show components that match the current filter
	//
	$scope.$watch("filter", function updateDisplayed() {
		$scope.displayedComponents = $scope.components.filter($scope.filter.match.bind($scope.filter));
	}, true);

	//// Go back to table view on filter change
	//
	$scope.$watch("filter", function updateDisplayed(newFilter, oldFilter) {
		if ($location.path().indexOf("/detail") >= 0 && !angular.equals(newFilter, oldFilter)) {
			$location.path("/");
		}
	}, true);

});
