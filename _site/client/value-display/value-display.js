angular.module('registry')
.directive('valueDisplay', function () {
    return {
        restrict: 'E',
        templateUrl: 'value-display/value-display.html',
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
