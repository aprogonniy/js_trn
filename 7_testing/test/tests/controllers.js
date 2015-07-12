QUnit.test("Global ctrl instance check", function (assert) {
    var appElement = document.querySelector('[ng-app=todomvc]');
    var appScope = angular.element(appElement).scope();
    var controllerScope = appScope.$$childHead;

    assert.equal(todoCtrl, controllerScope, "Global instance is the same as global scope head.");
});

QUnit.assert.customEqual = function (value1, value2, expected, message) {
    var actual = (value1.hasOwnProperty("addTodo") && value2.hasOwnProperty("addTodo"));
    var expected = true;
    this.push(actual === expected, actual, expected, message);
};

QUnit.test("Custom ctrl equal check", function (assert) {
    var appElement = document.querySelector('[ng-app=todomvc]');
    var appScope = angular.element(appElement).scope();
    var controllerScope = appScope.$$childHead;

    assert.customEqual(todoCtrl, controllerScope, true, "Global instance and global scope head are equal due to custom equal check.");
});