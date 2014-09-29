angular.module('registry')
.directive('componentCards', function () {
    return {
        restrict: 'E',
        templateUrl: 'component-cards/component-cards.html',
        replace: true,
        scope: true,
        link: function postLink($scope, iElement, iAttrs/*, controller*/) {
            $scope.filter = $scope.$parent.$eval(iAttrs.filter);
            $scope.filterFn = $scope.filter.match.bind($scope.filter);

            $scope.hiddenCount = 0;
            $scope.$watch("filter", function () {
                $scope.hiddenCount = _.countBy($scope.components, $scope.filter.match, $scope.filter)[false];
            }, true);

            $scope.notDisplayedInColumn = $scope.filter.notDisplayedInColumn;
        }
    };
});
