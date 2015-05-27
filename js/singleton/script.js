/**
 * Singleton pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Static class.
 */
var BingoSplashScreen = function () {
    _instance = null;
    _tagId    = "splash-screen";

    function SplashScreen(tagId) {
    	this._id = tagId;
    	this.show = function() {
			var spSc = document.getElementById(this._id);
			spSc.style.display = "block";
		};
		this.hide = function() {
    		var spSc = document.getElementById(this._id);
    		spSc.style.display = "none";
    	};
    	this.changeTagId = function(tagId) {
    		this._id = tagId;
    	};
    }

    getInstance = function() {
        if(!_instance)
        	_instance = new SplashScreen(_tagId);

        return _instance;
    };   

    return {
    	getInstance: getInstance
	};
}();



/*
 * Using.
 */
var splashScreen1 = BingoSplashScreen.getInstance();
splashScreen1.show();

var splashScreen2 = BingoSplashScreen.getInstance();
splashScreen2.hide();

console.info("1st instance is the same as 2nd one:");
console.log(splashScreen1 === splashScreen2);