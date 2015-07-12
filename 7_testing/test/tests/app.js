QUnit.module("todomvc");

QUnit.test("Angular check", function (assert) {
    assert.ok( angular, "angular global object is instantiated ok" );
});

QUnit.test("Module rules check", function (assert) {
    assert.ok( angular.module("todomvc"), "module is instantiated ok" );

    assert.throws(
        function() {
            angular.module("todomvc1");
        },
        /Module 'todomvc1' is not available!/,
        "angular module name validation works ok"
    );
});

