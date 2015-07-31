/**
 * Prototype pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Constants.
 */
var DEFAULT_SCOPE = "scope";

/*
 * Exception prototype.
 */
var Exception = function(type, text) {
	this._type = type;
	this._text = text;

	this.print = function() {
		console.log("Exception [" + this._type + "] \"" + this._text + "\"");
	};
	this.clone = function(text) {
		return new Exception(this._type, text);
	};
};

/*
 * Runtime exception.
 */
var RuntimeException = function(type, text, module) {
	this._type = type;
	this._text = text;
	this._module = DEFAULT_SCOPE;
	this._time = Date.now();
	
	if(module !== undefined && module !== null) {
		this._module = module;
	}
	
	this.print = function() {
		console.log("RuntimeException [" + this._type + "] + in [" + this._module + "] \"" + this._text + "\" (" + this._time + ")");
	};
	this.clone = function(text, module) {
		return new RuntimeException(this._type, text, module);
	};
};
RuntimeException.prototype = new Exception();

/*
 * User exception.
 */
var UserException = function(type, text, errorCode) {
	this._type = type;
	this._text = text;
	this._errorCode = errorCode;
	
	this.print = function() {
		console.log("UserException [" + this._type + "] + # [" + this._errorCode + "] \"" + this._text + "\"");
	};
	this.clone = function(text, errorCode) {
		return new UserException(this._type, text, errorCode);
	};
};
UserException.prototype = new Exception();



/*
 * Using.
 */
console.info("Default scope exception");
var runtimeException = new RuntimeException("runtime", "Runtime exception!", null);
runtimeException.print();

// Handle all runtime exceptions from the same scope
console.info("Handeled scope exceptions");
var undefinedException = runtimeException.clone("Requested object is not defined!", null);
undefinedException.print();

var nullException = runtimeException.clone("Null pointer exception!", null);
nullException.print();