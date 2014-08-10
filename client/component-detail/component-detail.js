angular.module('registry')
.directive('componentDetail', function () {
    return {
        restrict: 'E',
        templateUrl: 'component-detail/component-detail.html',
        link: function(scope, elem, attrs) {

            console.log(scope);
            var name = scope.$parent.name;

            components = scope.$parent.components;
            for(var index in components){
                // search for package - probably
                // there is a more efficient way
                if(components[index].name === name){
                     scope.c = components[index];
                }
            }
        }
    };
});
