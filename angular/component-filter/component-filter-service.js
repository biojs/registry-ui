angular.module('registry')

.factory('ComponentFilter', function (tagsDisplayedInOwnColumn) {

    function ComponentFilter() {
        this.tags = [];
        this.searchTerm = undefined;
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
        notDisplayedInColumn: function (tag) {
            return !(tag in tagsDisplayedInOwnColumn);
        },

        match: function match(component) {
          
             // there must be a match for each of the search terms
             var bResult = true;

             // filter tags
             // TODO: caseinsensitive
             if(!this.tagsEmpty()) {
                bResult =  _(this.tags).every(function (tag) {
                    return _(component.tags).contains(tag);
                }, this);
             }

            if(this.searchTerm) {

              var lSearchTerm  = this.searchTerm.toLowerCase();

              // multiple tags are separated by spaces
              var search = lSearchTerm.replace(/\s{2,}/g, ' ').trim();
              search = search.split(" ");


              for( var i in search){
                // occurs in the name or description
           
                if(component.lName.indexOf(search[i]) >= 0 ||
                    component.lDescription.indexOf(search[i]) >= 0) {
                  bResult = bResult & true;
                  continue;
                }

                // search tags
                // TODO: caseinsensitive
                var bTags = false;
                if(component.tags !== undefined) {
                 for( var j in component.tags ){
                    var tag = component.tags[j];
                    // dirty hack to ignore has flags
                    if(tag.substring(0,4) === "has:" ){
                      tag = tag.substring(4);
                    }
                    if( tag.indexOf(search[i]) >= 0){
                      bTags = bTags || true;
                      break;
                    }
                  }
                }

                // min. one tag found
                if(bTags){
                  continue;
                }

                // no match found in [name,tags]
                bResult = false;
              }
            }

            return bResult;
        },
    };

    return ComponentFilter;

})

    .constant("tagsDisplayedInOwnColumn", {
        'has:readme': true,
        'has:demos': true,
        'has:jsdocs': true,
        'has:build': true,
        'has:tests': true,
    })
