angular.module('registry').directive('componentTable', function (Component) {
    return {
        restrict: 'E',
        templateUrl: 'component-table/component-table-view.html',
        replace: true,
        scope: true,
        link: function postLink($scope, iElement, iAttrs/*, controller*/) {
            $scope.filter = $scope.$parent.$eval(iAttrs.filter);
            $scope.filterFn = $scope.filter.match.bind($scope.filter);

            $scope.components = Component.query();
        }
    };
});
