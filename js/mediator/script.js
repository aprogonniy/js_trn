/**
 * Mediator pattern implementation.
 *
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Mediator interface.
 */
var IModeHandler = function () {
    this.buyinModeStarted = function (roundInfo) { };
    this.presentationModeStarted = function (roundInfo) { };
    this.gameResultsModeStarted = function (roundInfo) { };
};

/*
 * Concrete mediator.
 */
var ModeManager = function () {
    this._infoPanel = null;
    this._ticketsPanel = null;
    this._miniGamesPanel = null;
    this._chatPanel = null;

    this.setInfoPanel = function (infoPanel) {
        this._infoPanel = infoPanel;
    };

    this.getInfoPanel = function () {
        return this._infoPanel;
    };

    this.setTicketsPanel = function (ticketsPanel) {
        this._ticketsPanel = ticketsPanel;
    };

    this.getTicketsPanel = function () {
        return this._ticketsPanel;
    };

    this.setMiniGamesPanel = function (miniGamesPanel) {
        this._miniGamesPanel = miniGamesPanel;
    };

    this.getMiniGamesPanel = function () {
        return this._miniGamesPanel;
    };

    this.setChatPanel = function (chatPanel) {
        this._chatPanel = chatPanel;
    };

    this.getChatPanel = function () {
        return this._chatPanel;
    };

    this.buyinModeStarted = function (roundInfo) {
        if (this._infoPanel !== null && this._infoPanel !== undefined) {
            this._infoPanel.startBuyin(roundInfo);
        }
        if (this._ticketsPanel !== null && this._ticketsPanel !== undefined) {
            this._ticketsPanel.startBuyin(roundInfo);
        }
        if (this._miniGamesPanel !== null && this._miniGamesPanel !== undefined) {
            this._miniGamesPanel.startBuyin(roundInfo);
        }
        if (this._chatPanel !== null && this._chatPanel !== undefined) {
            this._chatPanel.startBuyin(roundInfo);
        }
    };

    this.presentationModeStarted = function (roundInfo) {
        if (this._infoPanel !== null && this._infoPanel !== undefined) {
            this._infoPanel.startPresentation(roundInfo);
        }
        if (this._ticketsPanel !== null && this._ticketsPanel !== undefined) {
            this._ticketsPanel.startPresentation(roundInfo);
        }
        if (this._miniGamesPanel !== null && this._miniGamesPanel !== undefined) {
            this._miniGamesPanel.startPresentation(roundInfo);
        }
        if (this._chatPanel !== null && this._chatPanel !== undefined) {
            this._chatPanel.startPresentation(roundInfo);
        }
    };

    this.gameResultsModeStarted = function (roundInfo) {
        if (this._infoPanel !== null && this._infoPanel !== undefined) {
            this._infoPanel.showGameResults(roundInfo);
        }
        if (this._ticketsPanel !== null && this._ticketsPanel !== undefined) {
            this._ticketsPanel.showGameResults(roundInfo);
        }
        if (this._miniGamesPanel !== null && this._miniGamesPanel !== undefined) {
            this._miniGamesPanel.showGameResults(roundInfo);
        }
        if (this._chatPanel !== null && this._chatPanel !== undefined) {
            this._chatPanel.showGameResults(roundInfo);
        }
    };
};
ModeManager.prototype = new IModeHandler();

/*
 * Colleague interface.
 */
var IGamePanel = function (id) {
    this.startBuyin = function (roundInfo) { };
    this.startPresentation = function (roundInfo) { };
    this.showGameResults = function (roundInfo) { };
};

/*
 * Concrete colleagues.
 */
var InfoPanel = function (id) {
    this._id = id;

    this.startBuyin = function (roundInfo) {
        document.getElementById(this._id).innerHTML = "InfoPanel" + ": " + roundInfo.info;
    };

    this.startPresentation = function (roundInfo) {
        document.getElementById(this._id).innerHTML = "InfoPanel" + ": " + roundInfo.info;
    };

    this.showGameResults = function (roundInfo) {
        document.getElementById(this._id).innerHTML = "InfoPanel" + ": " + roundInfo.info;
    };
};
InfoPanel.prototype = new IGamePanel();

var TicketsPanel = function (id) {
    this._id = id;

    this.startBuyin = function (roundInfo) {
        document.getElementById(this._id).innerHTML = "TicketsPanel" + ": " + roundInfo.tickets;
    };

    this.startPresentation = function (roundInfo) {
        document.getElementById(this._id).innerHTML = "TicketsPanel" + ": " + roundInfo.tickets;
    };

    this.showGameResults = function (roundInfo) {
        document.getElementById(this._id).innerHTML = "TicketsPanel" + ": " + roundInfo.tickets;
    };
};
TicketsPanel.prototype = new IGamePanel();

var MiniGamesPanel = function (id) {
    this._id = id;

    this.startBuyin = function (roundInfo) {
        document.getElementById(this._id).innerHTML = "MiniGamesPanel" + ": " + roundInfo.games;
    };

    this.startPresentation = function (roundInfo) {
        document.getElementById(this._id).innerHTML = "MiniGamesPanel" + ": " + roundInfo.games;
    };

    this.showGameResults = function (roundInfo) {
        document.getElementById(this._id).innerHTML = "";
    };
};
MiniGamesPanel.prototype = new IGamePanel();

var ChatPanel = function (id) {
    this._id = id;

    this.startBuyin = function (roundInfo) {
        document.getElementById(this._id).innerHTML = "ChatPanel" + ": " + roundInfo.chat;
    };

    this.startPresentation = function (roundInfo) {
        document.getElementById(this._id).innerHTML = "ChatPanel" + ": " + roundInfo.chat;
    };

    this.showGameResults = function (roundInfo) {
        document.getElementById(this._id).innerHTML = "";
    };
};
ChatPanel.prototype = new IGamePanel();

/*
 * Context.
 */
var RoundInfo = function (info, tickets, games, chat) {
    this.info = info;
    this.tickets = tickets;
    this.games = games;
    this.chat = chat;
};



/*
 * Using
 */
var modeManager = new ModeManager();
console.log("Mediator: ", modeManager);

modeManager.setInfoPanel(new InfoPanel("script-holder-1"));
modeManager.setTicketsPanel(new TicketsPanel("script-holder-2"));
modeManager.setMiniGamesPanel(new MiniGamesPanel("script-holder-3"));

console.log("Mediator (with colleagues): ", modeManager);

console.log("Buyin mode started");
modeManager.buyinModeStarted(new RoundInfo(
    "buyin",
    [1, 2, 3, 4, 5],
    ["poker", "slots"],
    "no rooms"
));

setTimeout(function () {
    console.log("Presentation mode started");
    modeManager.presentationModeStarted(new RoundInfo(
        "presentation",
        [6, 7, 8, 9, 10],
        "no games",
        "no rooms"
    ));

    setTimeout(function () {
        console.log("Game results mode started");
        modeManager.gameResultsModeStarted(new RoundInfo(
            "game results",
            [11, 12],
            ["poker", "slots"],
            "no rooms"
        ));
    }, 1500);
}, 1500);