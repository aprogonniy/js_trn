/**
 * Todo controller file.
 * @author anonymous anonymous@gmail.com
 * @license Apache-2.0
 */

/**
 * @global
 * @type {angular.Controller}
 * @constructs TodoCtrl
 * @function TodoCtrl
 * @description The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 * @param {Object} $scope - Context of created controller.
 * @param {Object} $routeParams - Parameters of opened application route.
 * @param {Object} $filter - Global information converter.
 * @param {Object} store - Collection of existed todos.
 */
var todoCtrl;
angular.module('todomvc')
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, store) {
        'use strict';

        todoCtrl = $scope;

        /**
         * Collection of existed todos.
         * @type {Object}
         */
        var todos = $scope.todos = store.todos;

        /**
         * New todo entry object.
         * @type {String}
         */
        $scope.newTodo = '';

        /**
         * Edited todo entry object.
         * @type {null}
         */
        $scope.editedTodo = null;

        /**
         * Watchers functions initialization.
         */
        $scope.$watch('todos', function () {
            $scope.remainingCount = $filter('filter')(todos, {completed: false}).length;
            $scope.completedCount = todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
        }, true);

        /**
         * Monitor the current route for changes and adjust the filter accordingly.
         */
        $scope.$on('$routeChangeSuccess', function () {
            var status = $scope.status = $routeParams.status || '';
            $scope.statusFilter = (status === 'active') ?
            {completed: false} : (status === 'completed') ?
            {completed: true} : {};
        });

        /**
         * Add new todo entry.
         */
        $scope.addTodo = function () {
            var newTodo = {
                title: $scope.newTodo.trim(),
                completed: false
            };

            if (!newTodo.title) {
                return;
            }

            $scope.saving = true;
            store.insert(newTodo)
                .then(function success() {
                    $scope.newTodo = '';
                })
                .finally(function () {
                    $scope.saving = false;
                });
        };

        /**
         * Edit todo entry.
         * @param {Object} todo - Entry which will be edited.
         */
        $scope.editTodo = function (todo) {
            $scope.editedTodo = todo;
            // Clone the original todo to restore it on demand.
            $scope.originalTodo = angular.extend({}, todo);
        };

        /**
         * Save edited state of todo entry.
         * @param {Object} todo - Modified entry.
         * @param {String} event - Name of event which called the function.
         */
        $scope.saveEdits = function (todo, event) {
            // Blur events are automatically triggered after the form submit event.
            // This does some unfortunate logic handling to prevent saving twice.
            if (event === 'blur' && $scope.saveEvent === 'submit') {
                $scope.saveEvent = null;
                return;
            }

            $scope.saveEvent = event;

            if ($scope.reverted) {
                // Todo edits were reverted-- don't save.
                $scope.reverted = null;
                return;
            }

            todo.title = todo.title.trim();

            if (todo.title === $scope.originalTodo.title) {
                $scope.editedTodo = null;
                return;
            }

            store[todo.title ? 'put' : 'delete'](todo)
                .then(function success() {
                }, function error() {
                    todo.title = $scope.originalTodo.title;
                })
                .finally(function () {
                    $scope.editedTodo = null;
                });
        };

        /**
         * Save todo entry state to default value.
         * @param {Object} todo - Modified entry.
         */
        $scope.revertEdits = function (todo) {
            todos[todos.indexOf(todo)] = $scope.originalTodo;
            $scope.editedTodo = null;
            $scope.originalTodo = null;
            $scope.reverted = true;
        };

        /**
         * Delete todo entry.
         * @param {Object} todo - Entry to delete.
         */
        $scope.removeTodo = function (todo) {
            store.delete(todo);
        };

        /**
         * Save todo entry.
         * @param {Object} todo - Entry to save.
         */
        $scope.saveTodo = function (todo) {
            store.put(todo);
        };

        /**
         * Mark todo entry state.
         * @param {Object} todo - Entry to mark.
         * @param {Boolean} completed - Is entry completed parameter.
         */
        $scope.toggleCompleted = function (todo, completed) {
            if (angular.isDefined(completed)) {
                todo.completed = completed;
            }
            store.put(todo, todos.indexOf(todo))
                .then(function success() {
                }, function error() {
                    todo.completed = !todo.completed;
                });
        };

        /**
         * Delete all entries with completed state.
         */
        $scope.clearCompletedTodos = function () {
            store.clearCompleted();
        };

        /**
         * Mark all entries in collection.
         * @param {Boolean} completed - Is entry completed parameter.
         */
        $scope.markAll = function (completed) {
            todos.forEach(function (todo) {
                if (todo.completed !== completed) {
                    $scope.toggleCompleted(todo, completed);
                }
            });
        };
    });
