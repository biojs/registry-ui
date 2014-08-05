angular.module('registry').directive('tagList', function () {
    return {
        restrict: 'E',
        templateUrl: 'tag-list/tag-list-view.html',
        replace: true,
        scope: {
          filter: "=",
          tags: "@",
        },
        link: function postLink($scope, iElement, iAttrs/*, controller*/) {
            $scope.displayedTags = [];
            $scope.$watch("filter", function() {
              $scope.displayedTags = $scope.$parent.$eval(iAttrs.tags);
            }, true);
        }
    };
});
