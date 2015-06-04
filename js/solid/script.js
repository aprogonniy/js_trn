/**
 * Solid principles implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

// Open Close Principle
var CommunicationAPI = function(transport, serverUrl) {
	this._connection = null;
	this._transport = "WebSocket";
	if (transport !== null & transport !== undefined) {
		this._transport = transport;
	}
	this._serverUrl = "communication.server";
	if (serverUrl !== null & serverUrl !== undefined) {
		this._serverUrl = serverUrl;
	}
	this.connect = function(serverParameters) {
		if (this._connection === null) {
			throw new Exception("Connection already initialized");
			return;
		}
		this._connection = this._transport.connect(serverUrl, serverParameters);
	};
	this.disconnect = function() {
		this._connection = null;
	};
	this.login = function(username, password) {
		if (!username instanceof String || !password instanceof String) {
			throw new Exception("Wrong arguments received");
		}
		this._transport.login(username, password);
	};
	this.logout = function() {
		this._transport.logout();
	};
};

var BingoCommunicationAPI = function(transport, serverUrl, gameVariant) {
	this._connection = null;
	this._transport = "WebSocket";
	if (transport !== null & transport !== undefined) {
		this._transport = transport;
	}
	this._serverUrl = "communication.server";
	if (serverUrl !== null & serverUrl !== undefined) {
		this._serverUrl = serverUrl;
	}
	this._gameVariant = "BINGO_75";
	if (gameVariant !== null & gameVariant !== undefined) {
		this._gameVariant = gameVariant;
	}
	this.getRoundInfo = function(roundId) {
		if (roundId !== undefined && roundId !== null) {
			this._transport.getRoundInfo(roundId);
		} else {
			this._transport.getRoundInfo();
		}
	};
	this.buyTicket = function(ticketId) {
		this._transport.buyTicket(ticketId);
	};
};
BingoCommunicationAPI.prototype = new CommunicationAPI();



// Dependency Inversion Principle
var Parser = function() {
	this.parseTheme = function(themeInfoJson) {
	};
	this._themeParseFlashVars = function(themeInfoJson) {
		// do smth
	};
	this._themeParseSkin = function(themeInfoJson) {
		// do smth
	};
	return {
		flashVars : this._themeParseFlashVars(themeInfoJson),
		skins : this._themeParseSkin(themeInfoJson)
	};
};
var FlashVarsHandler = function() {
	this._parser = null;
	this.setParser = function(parser) {
		this._parser = parser;
	};
	this.updateConfigWithFlashVars = function(themeInfoJson) {
		var themeInfo = this._parser.parseTheme(themeInfoJson), flashVars = themeInfo.flashVars;
		// do smth
	};
};



// Single Responsibility Principle
// Interface Segregation Principle
/*
 * See "Chain of responsibility pattern" implementation
 */



// Liskov's Substitution Principle
var AlertPopup = function() {
	this.onClose = function(e) {
		console.log("Popup closed");
	};
};

var ConfirmationPopup = function() {
	this.onClose = function(e) {
		this._closeWithoutChanges(e);
	};
	this.onYesButtonClick = function(e) {
		// save smth
	};
	this.onNoButtonClick = function(e) {
		this._closeWithoutChanges(e);
	};
	this._closeWithoutChanges = function(e) {
		// do not save anything
	};
};
ConfirmationPopup.prototype = new AlertPopup();

var PopupManager = function() {
	this._queue = [];
	this.addPopupToQueue = function(popup) {
		this._queue.push(popup);
	};
	this.closeAllPopups = function() {
		for (var i = this._queue.length - 1; i > 0; i--) {
			this._queue[i].onClose(null);
			this._queue.pop();
		}
	};
};

var popupManager = new PopupManager();
popupManager.addPopupToQueue(new AlertPopup());
popupManager.addPopupToQueue(new ConfirmationPopup());
popupManager.closeAllPopups();