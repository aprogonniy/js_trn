/**
 * Strategy pattern implementation.
 *
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Strategy interface.
 */
var IErrorHandler = function () {
    this.catch = function (errorMessage) { };
};

/*
 * Concrete strategies.
 */
var ProductionErrorHandler = function () {
    this.catch = function (errorMessage) {
        return false;
    };
};
ProductionErrorHandler.prototype = new IErrorHandler();

var ConsoleErrorHandler = function () {
    this.catch = function (errorMessage) {
        console.error(errorMessage);
    };
};
ConsoleErrorHandler.prototype = new IErrorHandler();

var DialogErrorHandler = function () {
    this.catch = function (errorMessage) {
        alert(errorMessage);
    };
};
DialogErrorHandler.prototype = new IErrorHandler();

/*
 * Context.
 */
var Validator = function () {
    this._handler = null;

    this.setErrorHandler = function (handler) {
        this._handler = handler;
    };

    this.throw = function (errorMessage) {
        console.log("error thrown: ", errorMessage);

        if (this._handler !== null && this._handler !== undefined) {
            this._handler.catch(errorMessage);
        }
    };
};



/*
 * Using.
 */
var validator = new Validator(),
    productionErrHandler = new ProductionErrorHandler(),
    consoleErrHandler = new ConsoleErrorHandler(),
    dialogErrHandler = new DialogErrorHandler();


console.info("No assigned strategy");
validator.throw("This message will not be handled");

console.info("Console strategy");
validator.setErrorHandler(consoleErrHandler);
validator.throw("This message will be handled by console");

console.info("Production strategy");
validator.setErrorHandler(productionErrHandler);
validator.throw("This message will be hidden by prod mode");

console.info("Dialog strategy");
validator.setErrorHandler(dialogErrHandler);
validator.throw("This message will be handled by dialog");