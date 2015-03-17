/**
 * Decorator pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Constants.
 */
var BREAD_WHITE = 1,
    BREAD_BLACK = 2,
    MEAT_CHICKEN = 3,
    MEAT_BEEF = 4,
    CHEESE_SWI = 5,
    CHEESE_UKR = 6,
    SAUCE_SWEET = 7,
    SAUCE_SALT = 8,
    VEGET_CUCUM = 9,
    VEGET_POMID = 10,
    VEGET_CARRO = 11;

/*
 * Interface.
 */
var ISandwich = function () {
    this.getIngredients = function () {};
    this.addBread = function (type) {};
    this.addMeat = function (type) {};
    this.addCheese = function (type) {};
    this.getPrice = function () {};
};

/*
 * Simple sandwich.
 */
var SimpleSandwich = function() {
	this._ingredients = [];
	this._price = 0;
    
    this.addBread = function (type) {
        var breadCost = 10; // for black bread
        if (type == BREAD_WHITE) {
            breadCost = 20; // for white bread
        }

        this._ingredients.push("bread: " + breadCost);
        this._price = this._price + breadCost;
    };
    this.addMeat = function (type) {
        var meatCost = 30; // for chicken meat
        if (type == MEAT_BEEF) {
            meatCost = 40; // for beef
        }

        this._ingredients.push("meat: " + meatCost);
        this._price = this._price + meatCost;
    };
    this.addCheese = function (type) {
        var cheeseCost = 20; // for Ukrainian cheese
        if (type == CHEESE_SWI) {
            cheeseCost = 50; // for Swiss cheese
        }

        this._ingredients.push("cheese: " + cheeseCost);
        this._price = this._price + cheeseCost;
    };
    
    this.getPrice = function () {
        return this._price;
    };
    this.getIngredients = function () {
        return this._ingredients;
    };
};

SimpleSandwich.prototype = new ISandwich();

/*
 * Sandwich decorator.
 */
var DecoratedSandwich = function() {
	this._sandwichReference = null;
	
	this.setReference = function (sandwichReference) {
        this._sandwichReference = sandwichReference;
    };
    
    this.addBread = function (type) {
        if (this._sandwichReference) {
            this._sandwichReference.addBread(type);
        }
    };
    this.addMeat = function (type) {
        if (this._sandwichReference) {
            this._sandwichReference.addMeat(type);
        }
    };
    this.addCheese = function (type) {
        if (this._sandwichReference) {
            this._sandwichReference.addCheese(type);
        }
    };
    
    this.getPrice = function () {
        if (this._sandwichReference) {
            return this._sandwichReference.getPrice();
        }
    };
    this.getIngredients = function () {
        if (this._sandwichReference) {
            return this._sandwichReference.getIngredients();
        }
    };
};

DecoratedSandwich.prototype = new ISandwich();

/*
 * Advanced sandwich.
 */
var AdvancedSandwich = function() {
	this.setReference = function (sandwichReference) {
	    this._sandwichReference = sandwichReference;
	};
	
	this.addSauce = function (type) {
	    var sauceCost = 2; // for sweet and salt sauces

	    if (this._sandwichReference && this._sandwichReference._ingredients) {
	        this._sandwichReference._ingredients.push("sauce: " + sauceCost);
	    }
	    if (this._sandwichReference && this._sandwichReference._price) {
	        this._sandwichReference._price = this._sandwichReference._price + sauceCost;
	    }
	};
	
	this.addVegetables = function (type) {
	    var vegetCost = 1; // for cucumber
	    if (type == VEGET_POMID) {
	        vegetCost = 1.5; // for tomato
	    } else if (type == VEGET_CARRO) {
	        vegetCost = 1.3; // for carrot
	    }

	    if (this._sandwichReference && this._sandwichReference._ingredients) {
	        this._sandwichReference._ingredients.push("vegetables: " + vegetCost);
	    }
	    if (this._sandwichReference && this._sandwichReference._price) {
	        this._sandwichReference._price = this._sandwichReference._price + vegetCost;
	    }
	};
};

AdvancedSandwich.prototype = new DecoratedSandwich();



/*
 * Using.
 */

// Simple sandwich
var sandwich = new SimpleSandwich();
sandwich.addBread(BREAD_WHITE);
sandwich.addMeat(MEAT_CHICKEN);

console.info("Simple sandwich");
console.log("Ingredients:");
console.log(sandwich.getIngredients());
console.log("Price:");
console.log(sandwich.getPrice());

// Advanced sandwich
sandwichNew = new AdvancedSandwich();
sandwichNew.setReference(sandwich);
sandwichNew.addSauce(SAUCE_SALT);

sandwichNew.addVegetables(VEGET_CUCUM);
sandwichNew.addVegetables(VEGET_POMID);

console.info("Advanced sandwich");
console.log("Ingredients:");
console.log(sandwichNew.getIngredients());
console.log("Price:");
console.log(sandwichNew.getPrice());