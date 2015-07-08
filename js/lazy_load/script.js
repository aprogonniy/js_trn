/**
 * Lazy load (Lazy initialization) pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Mocked data storage.
 */
var Storage = function(elements) {
	this._elements = [];
	if (elements !== undefined && elements !== null) {
		this._elements = elements;
	}

	this._currentIndex = 0;

	this.getNextElement = function() {
		if (this._currentIndex + 1 < this._elements.length) {
			return this._elements[this._currentIndex++];
		}
	};

	this.getElementByIndex = function(index) {
		if (this._elements[index] !== undefined) {
			return this._elements[index];
		}
	};

	this.getElementsCount = function() {
		return this._elements.length;
	};
};

/*
 * Lazy loader class.
 */
var PaginationManager = function(dataStorage, numOfElementsPerPage) {
	this._storage = dataStorage;
	this._numOfElementsPerPage = numOfElementsPerPage;
	this._numOfPages = Math.ceil(dataStorage.getElementsCount()
			/ this._numOfElementsPerPage);
	this._elements = [];

	this.showPage = function(pageNumber) {
		if (pageNumber <= 0 || pageNumber > this._numOfPages) {
			throw new Error("Wrong value of page number parameter!");
		}

		var str = "", startIndex = (pageNumber - 1)
				* this._numOfElementsPerPage, endIndex = startIndex
				+ this._numOfElementsPerPage, valueFromStorage = null;
		
		for (var i = startIndex; i < endIndex; i++) {
			
			// Lazy loading logic.
			if (this._elements[i] === null || this._elements[i] === undefined) {
				valueFromStorage = this._storage.getElementByIndex(i);
				if (valueFromStorage === undefined || valueFromStorage === null) {
					break;
				}

				this._elements[i] = valueFromStorage;
			}

			str += this._elements[i] + " ";
		}

		console.log("Page #" + pageNumber + ": " + str);
	};

	this.showNumberOfElementsInMemory = function() {
		var loadedElementsCount = 0;

		for (var i = 0; i < this._elements.length; i++) {
			if (this._elements[i] !== undefined && this._elements[i] !== null) {
				loadedElementsCount++;
			}
		}

		console.log("Number of loaded elements:", loadedElementsCount);
	};
};



/*
 * Using.
 */
var ticketStorage = new Storage([ 'ticket1', 'ticket2', 'ticket3', 'ticket4',
                                  'ticket5', 'ticket6', 'ticket7', 'ticket8',
                          		  'ticket9', 'ticket10', 'ticket11', 'ticket12',
                          		  'ticket13', 'ticket14', 'ticket15', 'ticket16',
                          		  'ticket17', 'ticket18', 'ticket19', 'ticket20'
                          		  ]);

var ticketPagination = new PaginationManager(ticketStorage, 4);

console.info("Initial pagination state");
ticketPagination.showNumberOfElementsInMemory();

ticketPagination.showPage(1);
ticketPagination.showPage(3);

console.info("Resulted pagination state");
ticketPagination.showNumberOfElementsInMemory();