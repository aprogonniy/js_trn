/**
 * Command pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Command interface.
 */
var IOrder = function() {
	this.execute = function() {};
};

/*
 * Receiver.
 */
var PharmacyWorker = function() {
	this.findPills = function() {
		console.log('Worker has prepared pills for you.');
	};

	this.findLiquid = function() {
		console.log('Worker has prepared a liquid for you.');
	};

	this.findBondage = function() {
		console.log('Worker has prepared a bondage which you ordered.');
	};
};

/*
 * Invoker.
 */
var PharmacyCashier = function() {
	this._ordersQueue = [];

	this._getFirstAndRemove = function() {
		var first = this._ordersQueue[0];
		this._ordersQueue.shift();

		return first;
	};

	this.addOrderToReceipt = function(order) {
		this._ordersQueue.push(order);
		order.execute(this._getFirstAndRemove());
	};
};

/*
 * Concrete commands.
 */
var PillsOrder = function(pharmacyWorker) {
	this._pharmacyWorker = pharmacyWorker;

	this.execute = function() {
		this._pharmacyWorker.findPills();
	};
};
PillsOrder.prototype = new IOrder();

var LiquidOrder = function(pharmacyWorker) {
	this._pharmacyWorker = pharmacyWorker;

	this.execute = function() {
		this._pharmacyWorker.findLiquid();
	};
};
LiquidOrder.prototype = new IOrder();

var BondageOrder = function(pharmacyWorker) {
	this._pharmacyWorker = pharmacyWorker;

	this.execute = function() {
		this._pharmacyWorker.findBondage();
	};
};
BondageOrder.prototype = new IOrder();



/*
 * Using.
 */
var pharmacyWorker = new PharmacyWorker();

var pillsOrder = new PillsOrder(pharmacyWorker);
var bondageOrder = new BondageOrder(pharmacyWorker);
var liquidOrder = new LiquidOrder(pharmacyWorker);

var pharmacyCashier = new PharmacyCashier();
pharmacyCashier.addOrderToReceipt(pillsOrder); // buy pills
pharmacyCashier.addOrderToReceipt(bondageOrder); // buy pills
pharmacyCashier.addOrderToReceipt(liquidOrder); // buy pills