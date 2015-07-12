/**
 * Focus directive file.
 * @author anonymous anonymous@gmail.com
 * @license Apache-2.0
 */

/**
 * @global
 * @type {angular.Directive}
 * @function todoFocus
 * @description Directive that places focus on the element it is applied to when the
 * expression it binds to evaluates to true.
 * @returns {Function}
 */
angular.module('todomvc')
	.directive('todoFocus', function todoFocus($timeout) {
		'use strict';

		return function (scope, elem, attrs) {
			scope.$watch(attrs.todoFocus, function (newVal) {
				if (newVal) {
					$timeout(function () {
						elem[0].focus();
					}, 0, false);
				}
			});
		};
	});
