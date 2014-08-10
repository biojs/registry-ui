angular.module('registry')
.directive('componentDetail', function () {
    return {
        restrict: 'E',
        templateUrl: 'component-detail/component-detail.html',
    };
});
