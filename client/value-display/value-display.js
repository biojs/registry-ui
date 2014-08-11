angular.module('registry')
.directive('valueDisplay', function () {
    return {
        restrict: 'E',
        templateUrl: 'value-display/value-display.html',
	    scope: {
		    value:   '@',
		    glyph:   '@',
		    name:    '@',
		    prefix:  '@',
		    postfix: '@'
	    }
    };
});
