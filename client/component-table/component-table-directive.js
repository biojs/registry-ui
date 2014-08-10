angular.module('registry').directive('componentTable', function (Component, notDisplayedInColumn) {
    return {
        restrict: 'E',
        templateUrl: 'component-table/component-table-view.html',
        replace: true,
        scope: true,
        link: function postLink($scope, iElement, iAttrs/*, controller*/) {
            $scope.filter = $scope.$parent.$eval(iAttrs.filter);
            $scope.filterFn = $scope.filter.match.bind($scope.filter);


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

            $scope.showDetails = function(name){
                   // this seems to be wrong
                   $scope.$parent.$parent.layout = "detail";
                   $scope.$parent.$parent.name = name;
            }

            $scope.hiddenCount = 0;
            $scope.$watch("filter", function () {
                $scope.hiddenCount = _.countBy($scope.components, $scope.filter.match, $scope.filter)[false];
            }, true);


            $scope.notDisplayedInColumn = notDisplayedInColumn;
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
    .constant("tagsDisplayedInOwnColumn", {
        'has:readme': true,
        'has:demos': true,
        'has:jsdocs': true,
        'has:build': true,
        'has:tests': true,
    })
    .factory("notDisplayedInColumn", function (tagsDisplayedInOwnColumn) {
        return function (tag) {
            return !(tag in tagsDisplayedInOwnColumn);
        };
    });

