angular.module('registry')
.directive('valueDisplay', function () {
    return {
        restrict: 'E',
        templateUrl: TEMPLATE_URL + 'value-display/value-display.html',
	    scope: {
		    value:   '@',
		    glyph:   '@',
		    octicon: '@',
		    name:    '@',
		    prefix:  '@',
		    postfix: '@'
	    }
    };
});
