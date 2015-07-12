/**
 * Escape keys directive file.
 * @author anonymous anonymous@gmail.com
 * @license Apache-2.0
 */

/**
 * @global
 * @type {angular.Directive}
 * @function todoEscape
 * @description Directive that executes an expression when the element it is applied to gets
 * an `escape` keydown event.
 * @returns {Function}
 */
angular.module('todomvc')
	.directive('todoEscape', function () {
		'use strict';

        /**
         * Escape key code.
         * @type {Number}
         */
		var ESCAPE_KEY = 27;

		return function (scope, elem, attrs) {
			elem.bind('keydown', function (event) {
				if (event.keyCode === ESCAPE_KEY) {
					scope.$apply(attrs.todoEscape);
				}
			});

			scope.$on('$destroy', function () {
				elem.unbind('keydown');
			});
		};
	});
