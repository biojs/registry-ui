angular.module('registry').factory('ComponentFilter', function () {

    function ComponentFilter() {
        this.tags = [];
        this.searchTerm = null;
    }

    ComponentFilter.prototype = {
        togglePresent: function togglePresent(tag) {
            if (_(this.tags).contains(tag)) {
                _(this.tags).pull(tag);
            } else {
                _(this.tags).push(tag);
            }
        },
        tagPresent: function tagPresent(tag) {
            return _(this.tags).contains(tag);
        },
        match: function match(component) {
            if (this.searchTerm && component.name.indexOf(this.searchTerm) === -1) {
                return false;
            }
            var result = true;
            _(this.tags).forEach(function (tag) {
                if (!_(component.tags).contains(tag)) {
                    result = false;
                    return false;
                }
            }, this);
            return result;
        },
    };

    return ComponentFilter;

});
