angular.module('registry').directive('componentSearch', [function () {
    return {
        restrict: 'E',
        templateUrl: TEMPLATE_URL + 'component-search/component-search-view.html',
        replace: true,
        scope: {
            filter: '='
        }
    };
}]);
