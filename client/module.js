angular.module("registry", ['ngRoute'])
    .filter("present", function () {
        return function (item, field) {
            return item[field] ? "✓" : "✗";
        }
    })
    .filter("componentFilter", function () {
        return function (array, filter) {

        }
    })
    .run(function ($rootScope) {
        $rootScope.constructor.prototype._ = _;
    })

    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/detail/:name', {
            templateUrl: 'component-detail/component-detail.html',
            controller: 'DetailController'
          }).
          otherwise({
            redirectTo: '/',
            templateUrl: 'component-list/component-list.html',
          });
      }])