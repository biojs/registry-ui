angular.module("registry", [])
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
    });
