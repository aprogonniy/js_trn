/**
 * Builder pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Constants.
 */
var MENU_NAME_CHEEZE = "Cheezburger",
	MENU_NAME_TOY = "Knight",
	MENU_NAME_WATER = "Coke",
	WATER_SIZE_DEFAULT = "default",
	WATER_SIZE_SMALL = "small",
	WATER_SIZE_MEDIUM = 0.33,
	AMOUNT_DEFAULT = 1;

/*
 * Builder interface.
 */
var IMenuBuilder = function() {
	this.build = function() {};
	this.getName = function() {};
	this.getAmount = function() {};
	this.getSize = function() {};
};

/*
 * Entity.
 */
var MenuEntity = function() {
	this.name = null;
	this.amount = null;
	this.size = null;
};

/*
 * Director.
 */
var MenuDirector = function(builder) {
	this._entity = new MenuEntity();
	this._entity.name = builder.getName();
	this._entity.amount = builder.getAmount();
	this._entity.size = builder.getSize();

	this.__toString = function() {
		return this._entity;
	};
};

/*
 * Concrete builders.
 */
var MenuSandwichBuilder = function(mask) {
	this._name = MENU_NAME_CHEEZE;
	this._amount = AMOUNT_DEFAULT;
	this._size = WATER_SIZE_DEFAULT;

	this.setName = function(name) {
		if (name) {
			this._name = name;
		}

		return this;
	};

	this.setSize = function(size) {
		if (size) {
			this._size = size;
		}

		return this;
	};

	this.getName = function() {
		return this._name;
	};

	this.getAmount = function() {
		return this._amount;
	};

	this.getSize = function() {
		return this._size;
	};

	this.build = function() {
		return new MenuDirector(this);
	};
};
MenuSandwichBuilder.prototype = new IMenuBuilder();

var MenuToyBuilder = function(mask) {
	this._name = MENU_NAME_TOY;
	this._amount = AMOUNT_DEFAULT;
	this._size = WATER_SIZE_SMALL;

	this.setName = function(name) {
		if (name) {
			this._name = name;
		}

		return this;
	};

	this.setSize = function(size) {
		if (size) {
			this._size = size;
		}

		return this;
	};

	this.getName = function() {
		return this._name;
	};

	this.getAmount = function() {
		return this._amount;
	};

	this.getSize = function() {
		return this._size;
	};

	this.build = function() {
		return new MenuDirector(this);
	};
};
MenuToyBuilder.prototype = new IMenuBuilder();

var MenuWaterBuilder = function(mask) {
	this._name = MENU_NAME_WATER;
	this._amount = AMOUNT_DEFAULT;
	this._size = WATER_SIZE_MEDIUM;

	this.setName = function(name) {
		if (name) {
			this._name = name;
		}

		return this;
	};

	this.setSize = function(size) {
		if (size) {
			this._size = size;
		}

		return this;
	};

	this.getName = function() {
		return this._name;
	};

	this.getAmount = function() {
		return this._amount;
	};

	this.getSize = function() {
		return this._size;
	};

	this.build = function() {
		return new MenuDirector(this);
	};
};
MenuWaterBuilder.prototype = new IMenuBuilder();



/*
 * Using.
 */

console.log("Menu:");

var menu = new MenuSandwichBuilder();
menu.setName('Hamburger');
console.log(menu.build());

menu = new MenuWaterBuilder();
console.log(menu.build());

menu = new MenuToyBuilder();
menu.setName('King').setSize('big');
console.log(menu.build());