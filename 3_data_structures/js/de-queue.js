/**
 * De-queue data structure implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * De-queue class.
 */
var DeQueue = function (elements) {
    this._elements = [];
    if (elements !== null && elements !== undefined) {
        this._elements = elements;
    }

    // Add element at front.
    this.addAtFront = function (element) {
        if (element === null || element === undefined) {
            return -1;
        }

        var arr = [];

        arr[0] = element;

        for (var i = 0; i < this._elements.length; i++) {
            arr[i + 1] = this._elements[i];
        }

        this._elements = arr;

        return this._elements[0];
    };

    // Add element at back.
    this.addAtBack = function (element) {
        if (element === null || element === undefined) {
            return -1;
        }

        return this._elements[this._elements.length] = element;
    };

    // Add element to end.
    this.addToEnd = function (element) {
        if (element === null || element === undefined) {
            return -1;
        }

        return this._elements[this._elements.length] = element;
    };

    // Remove first element.
    this.removeFirst = function () {
        return this._removeElementByIndex(0);
    };

    // Remove last element.
    this.removeLast = function () {
        return this._removeElementByIndex(this._elements.length - 1);
    };

    // Examine first element.
    this.getFirst = function () {
        return this._elements[0];
    };

    // Examine last element.
    this.getLast = function () {
        return this._elements[this._elements.length - 1];
    };

    this.print = function () {
        return this._elements.join(", ");
    };

    this._removeElementByIndex = function (index) {
        if (index < 0 || index > this._elements.length - 1) {
            return -1;
        }

        var arr = [],
            deletedEl = null;
        for (var i = 0; i < this._elements.length; i++) {
            if (i === index) {
                deletedEl = this._elements[i];
                continue;
            }

            arr.push(this._elements[i]);
        }
        this._elements = arr;

        return deletedEl;
    };
};



/*
 * Using.
 */
console.info("De-queue example");

var deQueue = new DeQueue();
deQueue.addAtBack(2);
deQueue.addAtFront(1);
deQueue.addAtBack(3);
console.log("Initial de-queue:", deQueue.print());

console.log("Delete first element:", deQueue.removeFirst());
console.log("Delete last element:", deQueue.removeLast());

console.log("Resulted de-queue:", deQueue.print());