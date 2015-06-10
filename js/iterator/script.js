/**
 * Iterator pattern implementation.
 * 
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Iterator interface.
 */
var IIterator = function() {
	this.first = function() {
	};
	this.next = function() {
	};
	this.isDone = function() {
	};
	this.currentItem = function() {
	};
};

/*
 * Aggregates.
 */
var IAggregator = function() {
	this.createIterator = function() {
	};
};

var List = function(elements) {
	var _self = this;
	this._elements = [];
	if (elements !== undefined && elements !== null
			&& elements instanceof Array) {
		this._elements = elements;
	}

	this.add = function(element) {
		this._elements.push(element);
	};

	this.remove = function(index) {
		if (index < 0 || index > this._elements.length) {
			return;
		}

		var elements = [];
		for (var i = 0; i < this._elements; i++) {
			if (i !== index) {
				elements.push(this._elements[i]);
			}
		}
		this._elements = elements;
	};

	this.reset = function() {
		this._elements = [];
	};

	this.length = function() {
		return this._elements.length;
	};

	/*
	 * Concrete iterator
	 */
	this.createIterator = function() {
		return new ListIterator();
	};

	var ListIterator = function() {
		this._currentItemIndex = 0;
		
		this.first = function() {
			this._currentItemIndex = 0;
			return this.next();
		};
		this.next = function() {
			if(this._hasNext()) {
				return _self._elements[this._currentItemIndex++];
			}
		};
		this.isDone = function() {
			return (this._currentItemIndex === _self._elements.length);
		};
		
		this.currentItem = function() {
			return _self._elements[this._currentItemIndex];
		};
		
		this._hasNext = function() {
			return (this._currentItemIndex !== undefined && this._currentItemIndex !== null);
		};
	};
	
	ListIterator.prototype = new IIterator();
};

List.prototype = new IAggregator();



/*
 * Using
 */
var list = new List([0, 1, 2, 3, 4]);
console.log("List: ", list);

var iterator = list.createIterator();
console.log("Iterator: ", iterator);

console.groupCollapsed('Elements:');
do {
	console.log(iterator.next());
}
while(!iterator.isDone());
console.groupEnd();