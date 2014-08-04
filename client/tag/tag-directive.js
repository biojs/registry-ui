angular.module('registry').directive('tag', function () {
    return {
        restrict: 'E',
        templateUrl: 'tag/tag-view.html',
        replace: true,
        scope: {
            name: '@'
        },
        link: function postLink($scope, iElement, iAttrs/*, controller*/) {
            $scope.onClick = function onClick() {
                $scope.$parent.filter.togglePresent($scope.name);
            };
        }
    };
});
