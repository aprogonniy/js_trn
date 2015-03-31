/**
 * Factory method pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Constants.
 */
var STATE_CREATED = "CREATED",
	STATE_BOUGHT = "BOUGHT",
	PREFIX_BINGO_30 = "30_",
	PREFIX_BINGO_75 = "75_",
	TYPE_BINGO_30 = "BINGO_30",
	TYPE_BINGO_75 = "BINGO_75",
	LENGTH_BINGO_30 = 3,
	LENGTH_BINGO_75 = 7;

/*
 * Interface.
 */
var IBingoTicket = function() {
	this.render = function() {};
	this.getId = function() {};
	this.getState = function() {};
	this.setState = function() {};
	this.getContent = function() {};
};

/*
 * Bingo Ticket 30.
 */
var BingoTicket30 = function(content) {
	this._id = PREFIX_BINGO_30 + Date.now();
	this._state = STATE_CREATED;
	this._content = [];
	this._type = TYPE_BINGO_30;

	if (content !== undefined && content !== null) {
		this._content = content;
	}

	this.render = function() {
		console.log('Ticket ' + this._id + ": [" + this._content.toString() + "]");
	};
	this.getId = function() {
		return this._id;
	};
	this.getState = function() {
		return this._state;
	};
	this.setState = function(state) {
		this._state = state;

		return this._state;
	};
	this.getContent = function() {
		return this._content;
	};
	this.getType = function() {
		return this._type;
	};
};

BingoTicket30.prototype = new IBingoTicket();

/*
 * Bingo Ticket 75.
 */
var BingoTicket75 = function(content) {
	this._id = PREFIX_BINGO_75 + Date.now();
	this._state = STATE_CREATED;
	this._content = [];
	this._type = TYPE_BINGO_75;

	if (content !== undefined && content !== null) {
		this._content = content;
	}

	this.render = function() {
		console.log('Ticket ' + this._id + ": [" + this._content.toString() + "]");
	};
	this.getId = function() {
		return this._id;
	};
	this.getState = function() {
		return this._state;
	};
	this.setState = function(state) {
		this._state = state;

		return this._state;
	};
	this.getContent = function() {
		return this._content;
	};
	this.getType = function() {
		return this._type;
	};
};

BingoTicket75.prototype = new IBingoTicket();

/*
 * Bingo Ticket factory.
 */
var TicketContentGenerator = function() {
	this.generateTicket = function() {
		return new IBingoTicket();
	},

	this._generateRandomContent = function(length) {
		for (var a = [], i = 0; i < length; ++i) {
			a[i] = i;
		}

		function shuffle(array) {
			var tmp, current, top = array.length;
			if (top) {
				while (--top) {
					current = Math.floor(Math.random() * (top + 1));
					tmp = array[current];
					array[current] = array[top];
					array[top] = tmp;
				}
			}

			return array;
		}

		return shuffle(a);
	};
};

/*
 * Bingo Ticket concrete factories.
 */
var TicketEngineBingo30 = function() {
	this.generateTicket = function() {
		var contentSize = LENGTH_BINGO_30,
			content = "";
		
		content = this._generateRandomContent(contentSize);
		
		return new BingoTicket30(content);
	};
};

TicketEngineBingo30.prototype = new TicketContentGenerator();

var TicketEngineBingo75 = function() {
	this.generateTicket = function() {
		var contentSize = LENGTH_BINGO_75,
			content = "";
		
		content = this._generateRandomContent(contentSize);
		
		return new BingoTicket75(content);
	};
};

TicketEngineBingo75.prototype = new TicketContentGenerator();



/*
 * Using
 */
var ticketEngine30 = new TicketEngineBingo30();
var ticketEngine75 = new TicketEngineBingo75();

console.info("Bingo Ticket 30");
var ticket30 = ticketEngine30.generateTicket();
ticket30.render();

console.info("Bingo Ticket 75");
var ticket75 = ticketEngine75.generateTicket();
ticket75.render();