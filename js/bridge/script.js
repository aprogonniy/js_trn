/**
 * Bridge pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Constants.
 */
var EDIT_MODE_ERR = "The model is not in edit mode!",
	NO_IMPL_ERR = "The model does not have an implementor!",
	NO_SS_OBJECT = "There is no object with requested name in session storage!",
	NO_LS_OBJECT = "There is no object with requested name in local storage!";

/*
 * Abstraction interface.
 */
var IModel = function () {
    this.getName = function () { };
    this.setName = function (name) { };
    this.getEditMode = function () { };
    this.setEditMode = function (editMode) { };
    
    this.setImplementor = function(implementor) { };
    this.saveState = function() { };
    this.getState = function() { };
};

/*
 * Concrete abstraction.
 */
var User = function (login, token) {
	this._name = null;
	this._editMode = true;
	this._implementor = null;
	this._login = login;
	this._token = token;
	
	this.getName = function () {
		return this._name;
	};
    this.setName = function (name) {
    	if(this._editMode === false) {
    		throw new Error(EDIT_MODE_ERR);
    		return;
    	}
    	
    	this._name = name;
    };
    this.getEditMode = function () {
    	return this._editMode;
    };
    this.setEditMode = function (editMode) {
    	this._editMode = editMode;
    };
    this.getLogin = function () {
    	return this._login;
    };
    this.setToken = function (token) {
    	this._token = token;
    };
    this.getToken = function () {
    	return this._token;
    };
    
    /*
     * Implementor using.
     */
    this.setImplementor = function(implementor) {
    	this._implementor = implementor;
    };
    
    this.saveToken = function() {
    	if(this._implementor === null || this._implementor === undefined) {
    		throw new Error(NO_IMPL_ERR);
    		return;
    	}
    	
    	this._implementor.saveToken(this._name, this._token);
    };
    
    this.refreshToken = function() {
    	if(this._implementor === null || this._implementor === undefined) {
    		throw new Error(NO_IMPL_ERR);
    		return;
    	}
    	
    	this._token = this._implementor.getToken(this._name);
    };
};
User.prototype = new IModel();

/*
 * Implementor interface.
 */
var IStorage = function() {
    this.saveToken = function(name, token) { };
    this.getToken = function(name) { };
};

/*
 * Concrete implementors.
 */
var LocalStorage = function () {
	this.saveToken = function(name, token) {
		localStorage[name] = token;
	};
    this.getToken = function(name) {
    	if(localStorage[name] === null || localStorage[name] === undefined) {
    		throw new Error(NO_LS_OBJECT);
    	}
    	
    	return localStorage[name];
    };
};
LocalStorage.prototype = new IStorage();

var SessionStorage = function () {
	this.saveToken = function(name, token) {
		sessionStorage[name] = token;
	};
    this.getToken = function(name) {
    	if(sessionStorage[name] === null || sessionStorage[name] === undefined) {
    		throw new Error(NO_SS_OBJECT);
    	}
    	
    	return sessionStorage[name];
    };
};
SessionStorage.prototype = new IStorage();



/*
 * Using.
 */
var user = new User("pasha1", "UBL5Ke10pI4ST14gusfpF6lKy9iTl00w");
user.setName("pasha1 user");

var lsImplementor = new LocalStorage(),
	ssImplementor = new SessionStorage();

console.log(user.getName() + " initial token:", user.getToken());

user.setImplementor(lsImplementor);
user.saveToken();
user.setToken("t9MJumQx749ZIFGLgk90WHQkd0556E2V");

console.log(user.getName() + " edited token:", user.getToken());

user.refreshToken();
console.log(user.getName() + " stored token:", user.getToken());