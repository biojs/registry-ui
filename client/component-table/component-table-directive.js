angular.module('registry').directive('componentTable', function (Component) {
    return {
        restrict: 'E',
        templateUrl: 'component-table/component-table-view.html',
        replace: true,
        scope: true,
        link: function postLink($scope, iElement, iAttrs/*, controller*/) {
            $scope.filter = $scope.$parent.$eval(iAttrs.filter);
            $scope.filterFn = $scope.filter.match.bind($scope.filter);

            //$scope.components = Component.list;

            $scope.switchView = $scope.$parent.$parent.switchView;

            // simple ordering
            $scope.orderProp = "downloads";
            $scope.orderReverse = true;

            $scope.setOrderProp = function(name){
                if($scope.orderProp = name){
                    $scope.orderReverse = ! $scope.orderReverse;
                }else{
                    $scope.orderProp = name;
                }
            };

            $scope.hiddenCount = 0;
            $scope.$watch("filter", function () {
                $scope.hiddenCount = _.countBy($scope.components, $scope.filter.match, $scope.filter)[false];
            }, true);


            $scope.notDisplayedInColumn = $scope.filter.notDisplayedInColumn;
        }
    };
})
    .constant("knownTags", {
        'has:readme': { caption: "Readme" },
        'has:demos': { caption: "Demos" },
        'has:jsdocs': { caption: "JsDocs" },
        'has:build': { caption: "Build" },
        'has:tests': { caption: "Tests" },
    })



