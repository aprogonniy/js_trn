'use strict';

/**
 * @ngdoc function
 * @name angularTestAppApp.controller:MycontrollerCtrl
 * @description
 * # MycontrollerCtrl
 * Controller of the angularTestAppApp
 */
angular.module('angularTestAppApp')
  .controller('MycontrollerCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
