angular.module('registry').directive('tag', function () {
    return {
        restrict: 'E',
        templateUrl: 'tag/tag-view.html',
        scope: {
            name: '@',
        },
    };
});
