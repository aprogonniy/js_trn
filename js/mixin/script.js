/**
 * Mixin mechanism implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Mix function.
 */
var __extends = this.__extends || function(d, b) {
    function __() {
        this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
};

/*
 * Classes.
 */
var A = function() {
    this.a = "field a";
    this.getA = function() {
        return this.a;
    };
};
var B = function() {
    this.b = "field b";
    this.getB = function() {
        return this.b;
    };
};
__extends(A, B);
 


/*
 * Using.
 */
var a = new A();
console.log(a);