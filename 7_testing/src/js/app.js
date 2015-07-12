/**
 * Application router file.
 * @author anonymous anonymous@gmail.com
 * @license Apache-2.0
 */

/**
 * @global
 * @type {angular.Module}
 * @function config
 * @description The main TodoMVC app module.
 * @param {Object} $routeProvider - Global routes provider service.
 */
angular.module('todomvc', ['ngRoute'])
	.config(function ($routeProvider) {
		'use strict';

        /**
         * Configuration of router.
         * @type {{controller: String, templateUrl: String, resolve: {store: Function}}}
         */
		var routeConfig = {
			controller: 'TodoCtrl',
			templateUrl: 'todomvc-index.html',
			resolve: {
				store: function (todoStorage) {
					// Get the correct module (API or localStorage).
					return todoStorage.then(function (module) {
						module.get(); // Fetch the todo records in the background.
						return module;
					});
				}
			}
		};

        /**
         * Routes provider initialization.
         */
		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});
