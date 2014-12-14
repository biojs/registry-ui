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
    .filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
    }])
    .run(function ($rootScope) {
        $rootScope.constructor.prototype._ = _;
    })
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/detail/:name', {
            templateUrl: TEMPLATE_URL + 'component-detail/component-detail.html',
            controller: 'DetailController'
          }).
          otherwise({
            redirectTo: '/',
            templateUrl: TEMPLATE_URL + 'component-list/component-list.html',
          });
      }])
