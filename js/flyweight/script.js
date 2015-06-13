/**
 * Flyweight pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Constants.
 */
var TYPE_COMMON = "common",
	TYPE_RUSH = "rush",
	DELIVERY_TIME_COMMON = 1500,
	DELIVERY_TIME_RUSH = 500,
	BONUS_DEFAULT = 0,
	BONUS_INCREMENT = 5;

/*
 * Courier interface.
 */
var ICourier = function() {
	this.deliver = function(order) {};
	this.isBusy = function() {};
	this.getType = function() {};
	this.getOrder = function() {};
};

/*
 * Concrete couriers.
 */
var CommonCurier = function() {
	this._type = TYPE_COMMON;
	this._isBusy = false;
	this._order = null;

	this.deliver = function(order) {
		console.log("Common curier is busy!");
		this._isBusy = true;
		this._order = order;
		
		setTimeout(function(){
			console.log("Common curier is free!");
			this._isBusy = false;
			this._order = null;
		}, DELIVERY_TIME_COMMON);
	};
	
	this.isBusy = function() {
		return this._isBusy;
	};
	this.getType = function() {
		return this._type;
	};
	this.getOrder = function() {
		return this._order;
	};
};

CommonCurier.prototype = new ICourier();

var RushCurier = function() {
	this._type = TYPE_RUSH;
	this._isBusy = false;
	this._order = null;
	this._bonus = BONUS_DEFAULT;

	this.deliver = function(order) {
		console.log("Rush curier is busy!");
		this._isBusy = true;
		this._order = order;
		this._bonus += BONUS_INCREMENT;
		
		setTimeout(function(){
			console.log("Rush curier is free!");
			this._isBusy = false;
			this._order = null;
		}, DELIVERY_TIME_RUSH);
	};
	
	this.isBusy = function() {
		return this._isBusy;
	};
	this.getType = function() {
		return this._type;
	};
	this.getOrder = function() {
		return this._order;
	};
	this.getBonus = function() {
		return this._bonus;
	};
};

RushCurier.prototype = new ICourier();

/*
 * Courier Factory.
 */
var DeliveryService = function() {
	this._couriers = [];
	
	this.getCourier = function(type) {
		var courier = null;
		
		if(this._couriers[type] !== undefined && this._couriers[type] !== null) {
			// Get existing courier
			courier = this._couriers[type];
		} else {
			// Create new courier
			courier = this._createNewCourier(type);
		}
		this._couriers[type] = courier;
		
		return courier;
	};
	
	this._createNewCourier = function(type) {
		var courier = null;
		switch(type) {
			case TYPE_COMMON:
				courier = new CommonCurier();
				break;
			case TYPE_RUSH:
				courier = new RushCurier();
				break;
			default:
				throw "Unknown curier type requested!";
				break;
		}
		
		return courier;
	};
};



/*
 * Using
 */
var service = new DeliveryService();

console.info("New courier");
var courier1 = service.getCourier(TYPE_COMMON);
console.log(courier1);
courier1.deliver("ipad");

console.info("Existing courier");
var courier2 = service.getCourier(TYPE_COMMON);
console.log(courier2);
console.log("Courier 2 is delivering the " + courier2.getOrder());