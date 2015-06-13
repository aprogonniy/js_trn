/**
 * Memento pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Constants.
 */
var TRUE = true,
	FALSE = false;

/*
 * Originator.
 */
var UserConfigMemento = function(isEmailNotificationsEnabled, isPrivate, isAdmin) {
	this.isEmailNotificationsEnabled = isEmailNotificationsEnabled;
	this.isPrivate = isPrivate;
	this.isAdmin = isAdmin;

	this.setState = function(userConfigMemento) {
		this.isEmailNotificationsEnabled = userConfigMemento.isEmailNotificationsEnabled;
		this.isPrivate = userConfigMemento.isPrivate;
		this.isAdmin = userConfigMemento.isAdmin;
	};

	this.getState = function() {
		return {
			"isEmailNotificationsEnabled" : this.isEmailNotificationsEnabled,
			"isPrivate" : this.isPrivate,
			"isAdmin" : this.isAdmin
		};
	};
};

/*
 * Memento.
 */
var UserConfigForm = function(state) {
	this._createMemento = function() {
		return new UserConfigMemento(TRUE, TRUE, FALSE);
	};
	
	this.state = this._createMemento();
	if (this.state !== undefined && this.state !== null) {
		this.state = state.getState();
	}

	this.setMemento = function(memento) {
		this.state = memento.getState();
	};

	this.showMemento = function() {
		console.log(this.state);
	};

	this.changeEmailNotificationsParameter = function(isEnabled) {
		this.state.isEmailNotificationsEnabled = isEnabled;
	};

	this.changesPrivateParameter = function(isPrivate) {
		this.state.isPrivate = isPrivate;
	};

	this.changeAdminParameter = function(isAdmin) {
		this.state.isAdmin = isAdmin;
	};
};

/*
 * Using
 */

//render default user config
var userConfigMemento = new UserConfigMemento(TRUE, TRUE, FALSE);

var userForm = new UserConfigForm(userConfigMemento);
console.log("initial state:");
userForm.showMemento();

userForm.changeEmailNotificationsParameter(FALSE);
userForm.changeAdminParameter(TRUE);
console.log("current state:");
userForm.showMemento();

//reset state
userForm.setMemento(userConfigMemento);
console.log("reseted state:");
userForm.showMemento();