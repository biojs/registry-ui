angular.module('registry').directive('componentSearch', [function () {
    return {
        restrict: 'E',
        templateUrl: 'component-search/component-search-view.html',
        replace: true,
        scope: {
            filter: '='
        }
    };
}]);
