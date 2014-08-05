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
        searchEmpty: function searchEmpty() {
            return _(this.searchTerm).isEmpty();
        },
        tagsEmpty: function tagsEmpty() {
            return _(this.tags).isEmpty();
        },
        empty: function empty() {
            return this.searchEmpty() && this.tagsEmpty();
        },
        match: function match(component) {
            if (this.searchTerm && component.name.indexOf(this.searchTerm) === -1) {
                return false;
            }
            if(!this.tagsEmpty()) {
              return _(this.tags).every(function (tag) {
                  return _(component.tags).contains(tag);
              }, this);
            }
            return true;
        },
    };

    return ComponentFilter;

});
