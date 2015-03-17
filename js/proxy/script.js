/**
 * Proxy pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Library interface.
 */
var IDOM = function() {
	this.append = function(id, html) {};
	this.empty = function(id) {};
	this.remove = function(id) {};
};

/*
 * Real object.
 */
var JQuery = function() {};

JQuery.prototype = new IDOM();

JQuery.prototype.append = function(id, html) {
	console.log("JQuery.append call");

	$('#' + id).append(html);
};
JQuery.prototype.empty = function(id) {
	console.log("JQuery.empty call");

	$('#' + id).empty();
};
JQuery.prototype.remove = function(id) {
	console.log("JQuery.remove call");

	$('#' + id).remove();
};

/*
 * Proxy object.
 */
var JS = function() {
	this.isJQueryEnabled = function() {
		return (typeof jQuery != "undefined");
	};
};

JS.prototype = new IDOM();

JS.prototype.append = function(id, html) {
	console.log("JS.append call");

	if (this.isJQueryEnabled()) {
		// jQuery is enabled
		new JQuery().append(id, html);
	} else {
		// jQuery is not enabled
		document.getElementById(id).innerHTML += html;
	}
};
JS.prototype.empty = function(id) {
	console.log("JS.empty call");

	if (this.isJQueryEnabled()) {
		new JQuery().empty(id);
	} else {
		document.getElementById(id).innerHTML = null;
	}
};
JS.prototype.remove = function(id) {
	console.log("JS.remove call");

	if (this.isJQueryEnabled()) {
		new JQuery().remove(id);
	} else {
		var c = document.getElementById(id);
		c.parentNode.removeChild(c);
	}
};



/*
 * Using.
 */

// create lib obj
var JSLib = new JS();

console.info("jQuery is enabled");
// call real object method
JSLib.append("script-holder-1", "<p> -> jQuery append works!</p>");

setTimeout(function() {
	// disable jQuery
	delete jQuery;

	console.info("jQuery is disabled");
	// call proxy method
	JSLib.append("script-holder-1", "<p> => native JS append works!</p>");
}, 1500);