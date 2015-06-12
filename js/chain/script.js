/**
 * Chain of responsibility pattern implementation.
 * 
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Constants.
 */
var CSS_CLASS = ".",
	CSS_ID = "#",
	CSS_STATE = ":";

/*
 * Handler abstract class.
 */
var Handler = function() {
	this._mask = null;
	this._next = null;

	this.parse = function(selector, mask) {
		if (this._mask === mask) {
			this._parse(selector);
		}
		if (this.getNext()) {
			this.getNext().parse(selector, mask);
		}
	};

	this._parse = function(selector) { };

	this.setNext = function(next) {
		this._next = next;
	};

	this.getNext = function() {
		if (!this._next) {
			return false;
		}

		return this._next;
	};
};

/*
 * Concrete handlers.
 */
var ClassHandler = function(mask) {
	this._mask = mask;

	this._parse = function(selector) {
		if (selector.indexOf(this._mask) > -1) {
			console.log('- selector contains classname');
		} else {
			console.log('- selector doesn\'t contain classname');
		}
	};
};
ClassHandler.prototype = new Handler();

var IdHandler = function(mask) {
	this._mask = mask;

	this._parse = function(selector) {
		if (selector.indexOf(this._mask) > -1) {
			console.log('- selector contains identificator');
		} else {
			console.log('- selector doesn\'t contain identificator');
		}
	};
};
IdHandler.prototype = new Handler();

var StateHandler = function(mask) {
	this._mask = mask;

	this._parse = function(selector) {
		if (selector.indexOf(this._mask) > -1) {
			console.log('- selector contains state');
		} else {
			console.log('- selector doesn\'t contain state');
		}
	};
};
StateHandler.prototype = new Handler();



/*
 * Using.
 */

var handler1 = new IdHandler(CSS_ID);
var handler2 = new ClassHandler(CSS_CLASS);
var handler3 = new StateHandler(CSS_STATE);

handler1.setNext(handler2);
handler2.setNext(handler3);

var selector = '#page_wrapper .classname a:hover';

console.log("Selector (" + selector + ") parsing: ");
handler1.parse(selector, CSS_ID);
handler1.parse(selector, CSS_CLASS);
handler1.parse(selector, CSS_STATE);