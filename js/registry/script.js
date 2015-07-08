/**
 * Registry pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Mocked models.
 */
var PresentationInfo = function() {
    // Mocked content.

    this.getPresentationData = function() {
        return "presentation_data";
    };

    this.getRoundTiming = function() {
        return "presentation_round_timing";
    };
};

var PrizeInfo = function() {
    // Mocked content.

    this.getPrizes = function() {
        return "game_prizes";
    };

    this.getWinners = function() {
        return "game_winners";
    };
};

var Tickets = function () {
    // Mocked content.

    this.getPrizes = function() {
        return "game_prizes";
    };

    this.getWinners = function() {
        return "game_winners";
    };
};

var RoundInfo = function(presentationInfo, prizeInfo, tickets) {
    this.presentationInfo = {};
    this.prizeInfo = {};
    this.tickets = {};

    if(presentationInfo instanceof PresentationInfo) {
        this.presentationInfo = presentationInfo;
    }

    if(prizeInfo instanceof PrizeInfo) {
        this.prizeInfo = prizeInfo;
    }

    if(tickets instanceof Tickets) {
        this.tickets = tickets;
    }
};

/*
 * Registry class.
 */
var ServerResponsesManager = function() {
    this._roundInfoData = null;

    // First level of registry.
    this.setRoundInfoResponse = function(response) {
        if(response instanceof RoundInfo) {
            this._roundInfoData = response;
        }
    };

    this.getRoundInfoData = function() {
        if(this._roundInfoData !== null) {
            return this._roundInfoData;
        }
    };

    // Second level of registry.
    this.getPresentationInfoData = function() {
        if(this._roundInfoData !== null) {
            return this._roundInfoData.presentationInfo;
        }
    };

    this.getPrizeInfoData = function() {
        if(this._roundInfoData !== null) {
            return this._roundInfoData.prizeInfo;
        }
    };

    this.getTicketsData = function() {
        if(this._roundInfoData !== null) {
            return this._roundInfoData.tickets;
        }
    };

    // Third level of registry.
    this.getRoundTiming = function() {
        if(this._roundInfoData !== null) {
            return this._roundInfoData.presentationInfo.getRoundTiming();
        }
    };

    this.getRoundWinners = function() {
        if(this._roundInfoData !== null) {
            return this._roundInfoData.tickets.getWinners();
        }
    };
};



/*
 * Using.
 */
var getRoundInfoServerResponse = new RoundInfo(new PresentationInfo(), new PrizeInfo(), new Tickets());

var serverResponsesManager = new ServerResponsesManager();
serverResponsesManager.setRoundInfoResponse(getRoundInfoServerResponse);

console.log("Round info data:", serverResponsesManager.getRoundInfoData());
console.log("Presentation info data:", serverResponsesManager.getPresentationInfoData());
console.log("Winners info data:", serverResponsesManager.getRoundWinners());