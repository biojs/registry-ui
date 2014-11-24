angular.module('registry')
.directive('componentList', function () {
  return {
    restrict: 'E',
    templateUrl: 'component-list/component-list.html',
    link: function(scope, elem, attrs) {

      console.log(scope);

    }
  };
});
