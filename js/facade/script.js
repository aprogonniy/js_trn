/**
 * Facade pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Constants.
 */
var PANEL_SIZE_COLLAPSED = "collapsed",
	PANEL_SIZE_EXTENDED = "extended",
	PANEL_STATE_LOBBY = "lobby",
	PANEL_STATE_GAME = "game",
	TAB_STATE_LOBBY = "lobby",
	TAB_STATE_GAME = "game",
	TAB_LAYOUT_1 = "1f4c",
	TAB_LAYOUT_2 = "2f",
	ITEM_STATE_COMMON = "common",
	ITEM_STATE_FEATURED = "featured",
	ITEM_STATE_GAME = "game",
	ITEM_TYPE_IFRAME = "iframe",
	ITEM_TYPE_HTML = "html",
	ITEM_TYPE_LS = "livestream";

/*
 * Packages
 */
var MGPanel = function(state, size, isActive) {
	this._state = state;
	this._size = size;
	this._isActive = isActive;
	this._tabs = [];
	this._currentTab = null;

	this.openGame = function(game) {
		this._state = PANEL_STATE_GAME;
		this._currentTab.openGame(game);
	};
	this.closeGame = function() {
		this._resetState();
		this._currentTab.closeGame();
	};
	this.changeTab = function(newTab) {
		this._currentTab = newTab;
	};
	this.changeRound = function(newRound) {
		this._resetState();
		this._isActive = newRound.isActive;
	};
	this.setTabs = function(tabs) {
		this._tabs = tabs;
		this._currentTab = this._tabs[0];
	};
	this.render = function(id) {
		console.log("MGPanel rendered");
		for(var i = 0; i < this._tabs.length; i++) {
			this._tabs[i].render(id);
		}
	};
	this.disableSound = function() {
		for(var i = 0; i < this._tabs.length; i++) {
			this._tabs[i].disableSound();
		}
	};
	this._resetState = function() {
		this._tabs = [];
		this._size = PANEL_STATE_COLLAPSED;
		this._state = PANEL_STATE_LOBBY;
		this._isActive = true;
	};
};

var MGTab = function(layout, state) {
	this._layout = layout;
    this._state = state;
    this._games = [];
    this._openedGame = null;

    this.openGame = function(game) {
		for(var i = 0; i < this._games.length; i++) {
			 if(this._games[i] == game) {
				 this._openedGame = this._games[i];
				 this._openedGame.open();
				 this._state = TAB_STATE_GAME;
				 break;
			 }
		}
	};
	this.closeGame = function() {
		this._openedGame.close();
		this._openedGame = null;
		this._state = TAB_STATE_LOBBY;
	};
	this.changePage = function(newPage) {
		// do smth
	};
	this.setGames = function(games) {
		this._games = games;
	};
	this.render = function(id) {
		console.log("MGTab rendered");
		for(var i = 0; i < this._games.length; i++) {
			 this._games[i].render(id);
		}
	};
	this.disableSound = function() {
		for(var i = 0; i < this._games.length; i++) {
			 this._games[i].disableSound();
		}
	};
};

var MGItem = function(state, name, commonIcon, featuredIcon, gameUrl, type) {
	this._state = state;
	this._initState = state;
	this._name = name;
	this._commonIcon = commonIcon;
	this._featuredIcon = featuredIcon;
    this._gameUrl = gameUrl;
    this._type = type;
    this._isSoundEnabled = true;

    this.open = function() {
    	this._state = ITEM_STATE_GAME;
    	this.render();
	};
	this.close = function() {
		this._state = this._initState;
		this.render();
	};
	this.render = function(id) {
		if(this._state == ITEM_STATE_COMMON) {
			this._renderCommon(id);
		} else if (this._state == ITEM_STATE_FEATURED) {
			this._renderFeatured(id);
		} else {
			this._renderGame(id);
		}
	};
	this.disableSound = function() {
		this._isSoundEnabled = false;
		console.log("MGItem sound disabled");
	};
	this._renderCommon = function(id) {
		console.log("MGItem(common) rendered");
	};
	this._renderFeatured = function(id) {
		console.log("MGItem(featured) rendered");
	};
	this._renderGame = function(id) {
		console.log("MGItem(game) rendered");
	};
};

/*
 * Facade
 */
var MGWidget = function(id) {
	this._panel = null;
	this._isActive = Mock.getMGEnabledStatus();
	this._isSoundEnabled = Mock.getGameSoundsStatus();
    this._id = id;

    this.render = function() {
		var tabs = [],
			tab = null,
			games = [],
			game = null;
    	
    	this._panel = new MGPanel(PANEL_STATE_LOBBY, PANEL_SIZE_COLLAPSED, Mock.getMGEnabledStatus());
    	
    	// First tab
    	tab = new MGTab(TAB_LAYOUT_1, TAB_STATE_LOBBY);
    	
    	game = new MGItem(ITEM_STATE_FEATURED, "game1", "common.png", "featured.png", "/mini/games/1/index.html", ITEM_TYPE_IFRAME);
    	games.push(game);
    	
    	game = new MGItem(ITEM_STATE_COMMON, "game2", "common.png", "featured.png", "/mini/games/1/index.html", ITEM_TYPE_HTML);
    	games.push(game);
    	game = new MGItem(ITEM_STATE_COMMON, "game3", "common.png", "featured.png", "/mini/games/1/index.html", ITEM_TYPE_HTML);
    	games.push(game);
    	game = new MGItem(ITEM_STATE_COMMON, "game4", "common.png", "featured.png", "/mini/games/1/index.html", ITEM_TYPE_LS);
    	games.push(game);
    	game = new MGItem(ITEM_STATE_COMMON, "game5", "common.png", "featured.png", "/mini/games/1/index.html", ITEM_TYPE_IFRAME);
    	games.push(game);
    	
    	tab.setGames(games);
    	games = [];
    	
    	tabs.push(tab);
    	
    	// Second tab
    	tab = new MGTab(TAB_LAYOUT_2, TAB_STATE_LOBBY);
    	
    	game = new MGItem(ITEM_STATE_FEATURED, "game1", "common.png", "featured.png", "/mini/games/1/index.html", ITEM_TYPE_IFRAME);
    	games.push(game);
    	
    	game = new MGItem(ITEM_STATE_FEATURED, "game2", "common.png", "featured.png", "/mini/games/1/index.html", ITEM_TYPE_HTML);
    	games.push(game);
    	
    	tab.setGames(games);
    	games = [];
    	
    	tabs.push(tab);
    	
    	this._panel.setTabs(tabs);
    	this._panel.render(this._id);
	};
	this.changeRound = function(newRound) {
		this._panel.changeRound(newRound);
	};
	this.disableSound = function() {
		this._panel.disableSound();
	};
};

/*
 * Mock
 */
var Mock = function() {
	return {
		getGameSoundsStatus: function() {
			return true;
		},
		getMGEnabledStatus: function() {
			return true;
		}
	};
}();


/*
 * Using
 */
var widget = new MGWidget("script-holder-1");
widget.render();

widget.disableSound();