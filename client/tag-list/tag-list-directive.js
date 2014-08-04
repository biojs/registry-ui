angular.module('registry').directive('tagList', function () {
    return {
        restrict: 'E',
        templateUrl: 'tag-list/tag-list-view.html',
        replace: true,
        scope: true,
        link: function postLink($scope, iElement, iAttrs/*, controller*/) {
            $scope.tags = $scope.$parent.$eval(iAttrs.tags);
        }
    };
});
