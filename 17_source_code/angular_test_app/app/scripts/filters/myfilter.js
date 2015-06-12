'use strict';

/**
 * @ngdoc filter
 * @name angularTestAppApp.filter:myFilter
 * @function
 * @description
 * # myFilter
 * Filter in the angularTestAppApp.
 */
angular.module('angularTestAppApp')
  .filter('myFilter', function () {
    return function (input) {
      return 'myFilter filter: ' + input;
    };
  });
