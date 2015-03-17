/**
 * Factory pattern implementation.
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

    if(content !== undefined && content !== null) {
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

    if(content !== undefined && content !== null) {
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
var TicketEngine = function() {
    this.generateTicket = function(type) {
        var contentSize = 0,
            content = "",
            ticket = null;
        
        if(type == TYPE_BINGO_30) {
            contentSize = LENGTH_BINGO_30;
            content = this._generateRandomContent(contentSize);
            ticket = new BingoTicket30(content);
        } else if(type == TYPE_BINGO_75) {
            contentSize = LENGTH_BINGO_75;
            content = this._generateRandomContent(contentSize);
            ticket = new BingoTicket75(content);
        }

        return ticket;
    };
    this._generateRandomContent = function(length) {
    	 for (var a = [], i = 0; i < length; ++i) {
    		 a[i] = i;
    	 }

    	 function shuffle(array) {
      	   var tmp = null,
               current = null,
               top = array.length;
      	   
           if(top) {
      		   while(--top) {
	      	     current        = Math.floor(Math.random() * (top + 1));
	      	     tmp            = array[current];
	      	     array[current] = array[top];
	      	     array[top]     = tmp;
	      	   }
      	   }
      	   
      	   return array;
      	 }

    	 return shuffle(a);
    };
};



/*
 * Using
 */
var ticketEngine = new TicketEngine();

console.info("Bingo Ticket 30");
var ticket30 = ticketEngine.generateTicket(TYPE_BINGO_30);
ticket30.render();

console.info("Bingo Ticket 75");
var ticket75 = ticketEngine.generateTicket(TYPE_BINGO_75);
ticket75.render();