/**
 * Visitor pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Constants.
 */
var MESSAGE_FEATURED = "Featured minigame has been visited.",
	MESSAGE_COMMON = "Common minigame has been visited.";

/*
 * Visitors.
 */
var Visitor = function() {
	this.visit = function(minigame) {
		if (minigame instanceof CommonMinigame) {
			this._visitCommon(minigame);
		} else {
			this._visitFeatured(minigame);
		}
	};
	this._visitFeatured = function(featuredMinigame) {
		console.log(MESSAGE_FEATURED);
	};
	this._visitCommon = function(commonMinigame) {
		console.log(MESSAGE_COMMON);
	};
};

var SoundManagerVisitor = function() {
	this.visit = function(minigame) {
		if (minigame instanceof CommonMinigame) {
			this._visitCommon(minigame);
		} else {
			this._visitFeatured(minigame);
		}
	};
	this._visitFeatured = function(featuredMinigame) {
		featuredMinigame.setIsSoundEnabled(false);
	};
	this._visitCommon = function(commonMinigame) {
		commonMinigame.setIsActionsSoundsEnabled(false);
	};
};
SoundManagerVisitor.prototype = new Visitor();

var ThemeManagerVisitor = function(theme) {
	this._theme = theme;

	this.setTheme = function(theme) {
		this._theme = theme;
	};
	this.getTheme = function() {
		return this._theme;
	};

	this.visit = function(minigame) {
		if (minigame instanceof CommonMinigame) {
			this._visitCommon(minigame);
		} else {
			this._visitFeatured(minigame);
		}
	};
	this._visitFeatured = function(featuredMinigame) {
		featuredMinigame.setTheme(this._theme);
	};
	this._visitCommon = function(commonMinigame) {
		commonMinigame.setTheme(this._theme);
	};
};
ThemeManagerVisitor.prototype = new Visitor();

/*
 * Elements.
 */
var Minigame = function(name, source, theme) {
	this._name = name;
	this._source = source;
	this._theme = theme;
	this._visitor = null;

	this.getTheme = function() {
		return this._theme;
	};
	this.setTheme = function(theme) {
		this._theme = theme;
	};

	this.getName = function() {
		return this._name;
	};
	this.getSource = function() {
		return this._source;
	};

	this.callVisitor = function() {
		if (this._visitor !== null) {
			this._visitor.visit(this);
		}
	};
	this.accept = function(visitor) {
		this._visitor = visitor;
	};
};

var CommonMinigame = function(name, source, theme) {
	this._name = name;
	this._source = source;
	this._theme = theme;
	this._isActionsSoundsEnabled = true;

	this.getIsActionsSoundsEnabled = function() {
		return this._isActionsSoundsEnabled;
	};
	this.setIsActionsSoundsEnabled = function(isActionsSoundsEnabled) {
		this._isActionsSoundsEnabled = isActionsSoundsEnabled;
	};
};
CommonMinigame.prototype = new Minigame();

var FeaturedMinigame = function(name, source, theme) {
	this._name = name;
	this._source = source;
	this._theme = theme;
	this._isSoundEnabled = true;

	this.getIsSoundEnabled = function() {
		return this._isSoundEnabled;
	};
	this.setIsSoundEnabled = function(isSoundEnabled) {
		this._isSoundEnabled = isSoundEnabled;
	};
};
FeaturedMinigame.prototype = new Minigame();

/*
 * ObjectStructure.
 */
var MinigamesPanel = function() {
	this._minigames = [];

	this.getMinigames = function() {
		return this._minigames;
	};

	this.add = function(minigame) {
		this._minigames.push(minigame);
	};

	this.remove = function(name) {
		var minigamesNew = [];

		for (var i = 0; i < this._minigames.length; i++) {
			if (this._minigames[i].getName == name) {
				continue;
			}
			minigamesNew.push(this._minigames[i]);
		}

		this._minigames = minigamesNew;
	};

	this.clear = function() {
		this._minigames = [];
	};

	this.visit = function() {
		for (var i = 0; i < this._minigames.length; i++) {
			this._minigames[i].callVisitor();
		}
	};
};



/*
 * Using.
 */
var themeVisitor = new ThemeManagerVisitor("woman");

var minigamesPanel = new MinigamesPanel();

var fgame = new FeaturedMinigame("game1", "game1.html", "man");
fgame.accept(themeVisitor);
minigamesPanel.add(fgame);

var cgame = new CommonMinigame("game2", "game2.html", "child");
cgame.accept(themeVisitor);
minigamesPanel.add(cgame);

console.log("Init panel state:", minigamesPanel);
setTimeout(function() {
	minigamesPanel.visit();
	console.log("Result panel state:", minigamesPanel);
}, 5000);