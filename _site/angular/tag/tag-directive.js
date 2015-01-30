angular.module('registry').directive('tag', function (knownTags, tagsDisplayedInOwnColumn) {
    return {
        restrict: 'E',
        templateUrl: TEMPLATE_URL + 'tag/tag-view.html',
        scope: {
            active: '@'
        },
        link: function postLink($scope, iElement, iAttrs) {
            $scope.tag = knownTags[iAttrs.name] || { name: iAttrs.name, caption: iAttrs.name };
            $scope.isColumnTag = !!tagsDisplayedInOwnColumn[iAttrs.name];
        }
    };
});
