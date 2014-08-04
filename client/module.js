angular.module("registry", [])
    .filter("present", function () {
        return function (item, field) {
            return item[field] ? "✓" : "✗";
        }
    })
    .filter("componentFilter", function () {
        return function (array, filter) {

        }
    });
