/**
 * Observer pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Constants.
 */
var POSITIVE_RESULT = 1,
	NEGATIVE_RESULT = 0,
	ERROR_RESULT = -1,
	GUEST_USERNAME = "guest",
	RENDER_MESSAGE = "widget rendered",
	UPDATE_MESSAGE = "widget updated",
	LOGIN_MESSAGE = "login to see a widget",
	BALANCE_MESSAGE = "your balance is 1k dollars",
	GAME_INFO_MESSAGE = "draw flow goes here...";

/*
 * Portal API.
 */
var User = function() {
	this._username = GUEST_USERNAME;
	this._loginHandlers = [];

	this.login = function(username) {
		// mocked login function
		this._username = username;

		for (var i = 0; i < this._loginHandlers.length; i++) {
			this._loginHandlers[i].update();
		}

		return POSITIVE_RESULT;
	};
	this.isUserLoggedIn = function() {
		return (this._username != GUEST_USERNAME);
	};
	this.getUsername = function() {
		return this._username;
	};
	this.setLoginHandler = function(handler) {
		if (this._getLoginHandlerId(handler) == -1) {
			this._loginHandlers.push(handler);

			return POSITIVE_RESULT;
		}

		return NEGATIVE_RESULT;
	};
	this.removeLoginHandler = function(handler) {
		var handlerId = this._getLoginHandlerId(handler);
		if (handlerId != -1) {
			this._loginHandlers.splice(handlerId, 1);

			return POSITIVE_RESULT;
		}

		return ERROR_RESULT;
	};
	
	this._getLoginHandlerId = function(handler) {
		return this._loginHandlers.indexOf(handler);
	};
};

/*
 * Game application.
 */
var Widget = function(id, userObjReference) {
	this._id = id;
	this._userObjReference = userObjReference;

	this.render = function() {
		document.getElementById(this._id).innerHtml = RENDER_MESSAGE;
	};
	this.update = function() {
		document.getElementById(this._id).innerHtml = UPDATE_MESSAGE;
	};
};

var PlayerBalanceWidget = function(id, userObjReference) {
	this._id = id;
	this._userObjReference = userObjReference;

	this.render = function() {
		var renderMessage = LOGIN_MESSAGE;
		if (this._userObjReference && this._userObjReference.isUserLoggedIn()) {
			renderMessage = BALANCE_MESSAGE;
		}

		if (this._id) {
			document.getElementById(this._id).innerHTML = renderMessage;
		}
	};
	this.update = function() {
		if (this._userObjReference && this._userObjReference.isUserLoggedIn()) {
			document.getElementById(this._id).innerHTML = BALANCE_MESSAGE;
		}
	};
};

PlayerBalanceWidget.prototype = new Widget();

var GameInfoWidget = function(id, userObjReference, gameName, currentStatus) {
	this._id = id;
	this._userObjReference = userObjReference;
	this._gameName = userObjReference;
	this._currentStatus = userObjReference;

	this.getGameName = function() {
		return this._gameName;
	};
	this.getCurrentStatus = function() {
		return this._currentStatus;
	};
	this.setCurrentStatus = function(status) {
		this._currentStatus = status;
	};
	
	this.render = function() {
		var renderMessage = LOGIN_MESSAGE;
		if (this._userObjReference && this._userObjReference.isUserLoggedIn()) {
			renderMessage = GAME_INFO_MESSAGE;
		}

		if (this._id) {
			document.getElementById(this._id).innerHTML = renderMessage;
		}
	};
	this.update = function() {
		if (this._userObjReference && this._userObjReference.isUserLoggedIn()) {
			document.getElementById(this._id).innerHTML = GAME_INFO_MESSAGE;
		}
	};
};

GameInfoWidget.prototype = new Widget();



/*
 * Using.
 */
var portalUser = new User();

console.info("Unauthorized user mode");
var widgetBalance = new PlayerBalanceWidget("script-holder-1", portalUser);
widgetBalance.render();

var widgetGameInfo = new GameInfoWidget("script-holder-2", portalUser);
widgetGameInfo.render();

console.log("Login will be performed in 5 sec.");
setTimeout(function(){
	portalUser.setLoginHandler(widgetBalance);
	portalUser.setLoginHandler(widgetGameInfo);
	portalUser.login("alepro");
	console.info("Logged in user mode");
}, 5000);