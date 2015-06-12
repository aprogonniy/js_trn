'use strict';

/**
 * @ngdoc function
 * @name angularTestAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularTestAppApp
 */
angular.module('angularTestAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
