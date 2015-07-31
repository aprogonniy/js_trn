/**
 * MVC pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Models.
 */
var GameSettings = function(autoDubState, displayBestState) {
	this._isAutoDubEnabled = autoDubState;
	this._isDisplayBestEnabled = displayBestState;
    this._onStateChangedHandler = null;

	this.setAutoDub = function(autoDubState) {
		if (typeof (autoDubState) == 'boolean') {
			this._isAutoDubEnabled = autoDubState;

            if(this._onStateChangedHandler !== null) {
                this._onStateChangedHandler.call();
            }
        }
	};
	this.getAutoDub = function() {
		return this._isAutoDubEnabled;
	};
	this.setDisplayBest = function(displayBestState) {
		if (typeof (displayBestState) == 'boolean') {
			this._isDisplayBestEnabled = displayBestState;

            if(this._onStateChangedHandler !== null) {
                this._onStateChangedHandler.call();
            }
		}
	};
	this.getDisplayBest = function() {
		return this._isDisplayBestEnabled;
	};
    this.setOnStateChangedHandler = function(callback) {
        this._onStateChangedHandler = callback;
    };
};

var GraphicsSettings = function(displayBestQualityState) {
	this._isBestQualityEnabled = displayBestQualityState;
    this._onStateChangedHandler = null;

	this.setBestQuality = function(displayBestQualityState) {
		if (typeof (displayBestQualityState) == 'boolean') {
			this._isBestQualityEnabled = displayBestQualityState;

            if(this._onStateChangedHandler !== null) {
                this._onStateChangedHandler.call();
            }
		}
	};
	this.getBestQuality = function() {
		return this._isBestQualityEnabled;
	};
    this.setOnStateChangedHandler = function(callback) {
        this._onStateChangedHandler = callback;
    };
};

var SoundsSettings = function(soundsState, effectsState, callerState) {
	this._isSoundsEnabled = soundsState;
	this._isEffectsEnabled = effectsState;
	this._isCallerEnabled = callerState;
    this._onStateChangedHandler = null;

	this.setSounds = function(soundsState) {
		if (typeof (soundsState) == 'boolean') {
			this._isSoundsEnabled = soundsState;

            if(this._onStateChangedHandler !== null) {
                this._onStateChangedHandler.call();
            }
		}
	};
	this.getSounds = function() {
		return this._isSoundsEnabled;
	};

	this.setEffects = function(effectsState) {
		if (typeof (effectsState) == 'boolean') {
			this._isEffectsEnabled = effectsState;

            if(this._onStateChangedHandler !== null) {
                this._onStateChangedHandler.call();
            }
		}
	};
	this.getEffects = function() {
		return this._isEffectsEnabled;
	};

	this.setCaller = function(callerState) {
		if (typeof (callerState) == 'boolean') {
			this._isCallerEnabled = callerState;

            if(this._onStateChangedHandler !== null) {
                this._onStateChangedHandler.call();
            }
		}
	};
	this.getCaller = function() {
		return this._isCallerEnabled;
	};
    this.setOnStateChangedHandler = function(callback) {
        this._onStateChangedHandler = callback;
    };
};

var Options = function(gameSettings, graphicsSettings, soundsSettings) {
    this._onStateChangedHandler = null;

	this._gameSettings = new GameSettings();
	if (gameSettings !== null && gameSettings !== undefined
			&& gameSettings instanceof GameSettings) {
		this._gameSettings = gameSettings;
	}

	this._graphicsSettings = new GraphicsSettings();
	if (graphicsSettings !== null && graphicsSettings !== undefined
			&& graphicsSettings instanceof GraphicsSettings) {
		this._graphicsSettings = graphicsSettings;
	}

	this._soundsSettings = new SoundsSettings();
	if (soundsSettings !== null && soundsSettings !== undefined
			&& soundsSettings instanceof SoundsSettings) {
		this._soundsSettings = soundsSettings;
	}

	this.setGameSettings = function(gameSettings) {
		if (gameSettings instanceof GameSettings) {
			this._gameSettings = gameSettings;

            if(this._onStateChangedHandler !== null) {
                this._onStateChangedHandler.call();
            }
		}
	};
	this.getGameSettings = function() {
		return this._gameSettings;
	};

	this.setGraphicsSettings = function(graphicsSettings) {
		if (graphicsSettings instanceof GraphicsSettings) {
			this._graphicsSettings = graphicsSettings;

            if(this._onStateChangedHandler !== null) {
                this._onStateChangedHandler.call();
            }
		}
	};
	this.getGraphicsSettings = function() {
		return this._graphicsSettings;
	};

	this.setSoundsSettings = function(soundsSettings) {
		if (soundsSettings instanceof SoundsSettings) {
			this._soundsSettings = soundsSettings;

            if(this._onStateChangedHandler !== null) {
                this._onStateChangedHandler.call();
            }
		}
	};
	this.getSoundsSettings = function() {
		return this._soundsSettings;
	};
    this.setOnStateChangedHandler = function(callback) {
        this._onStateChangedHandler = callback;
    };
};

/*
 * Controllers.
 */
var OptionsController = function(model) {
	this._model = null;
	if (model !== null && model !== undefined && model instanceof Options) {
		this._model = model;
	}

    this._isValidState = function(option) {
        var result = false;

        if(typeof option === "boolean") {
            result = true;
        }

        return result;
    };

	this.updateState = function(autoDubState, displayBestState, displayBestQualityState, soundsState, effectsState, callerState) {
		if(this._isValidState(autoDubState) && this._isValidState(displayBestState)) {
            this._model.setGameSettings(new GameSettings(autoDubState, displayBestState));
        }

        if(this._isValidState(displayBestQualityState)) {
            this._model.setGraphicsSettings(new GraphicsSettings(displayBestQualityState));
        }

        if(this._isValidState(soundsState) && this._isValidState(effectsState) && this._isValidState(callerState)) {
            this._model.setSoundsSettings(new SoundsSettings(soundsState, effectsState, callerState));
        }
	};
};

/*
 * Views.
 */
var OptionsView = function(containerName, model, controller) {
    this._model = null;
    if (model !== null && model !== undefined
        && model instanceof Options) {
        this._model = model;
    }

    this._controller = new OptionsController();
	if (controller !== null && controller !== undefined
			&& controller instanceof OptionsController) {
		this._controller = controller;
	}

	this._containerName = containerName;

	this._template = "<form id='options-form' name='options-panel' method='get' onsubmit='return false;'><label>GameSettings</label><br /><input id='autoDub' type='checkbox' value='true' />Auto dub<br /><input id='displayBest' type='checkbox' value='true' />Display my best<br /><br /><label>GraphicsSettings</label><br /><input id='bestQuality' type='checkbox' value='true' />Best quality<br /><br /><label>SoundsSettings</label><br /><input id='sounds' type='checkbox' value='true' />All sounds<br /><input id='effects' type='checkbox' value='true' />Sound effects<br /><input id='caller' type='checkbox' value='true' />Caller voice<br /><input type='button' value='Save' onclick='saveFormState();return false;'></form>";

	this.render = function() {
        var container = document.getElementById(containerName),
            modelState = this._getOptions();

        if(!!!document.getElementById('options-form')) {
            container.innerHTML = this._template;
        }

        // put model state to form
        var autoDubField = document.getElementById("autoDub");
        autoDubField.checked = modelState.isAutoDubEnabled;

        var displayBestField = document.getElementById("displayBest");
        displayBestField.checked = modelState.isDisplayBestEnabled;

        var bestQualityField = document.getElementById("bestQuality");
        bestQualityField.checked = modelState.isBestQualityEnabled;

        var soundsField = document.getElementById("sounds");
        soundsField.checked = modelState.isSoundsEnabled;

        var effectsField = document.getElementById("effects");
        effectsField.checked = modelState.isEffectsEnabled;

        var callerField = document.getElementById("caller");
        callerField.checked = modelState.isCallerEnabled;
	};

    this.modelActionsHandler = function() {
        console.log("Model changed");
    };

    this.formActionsHandler = function() {
        formState = {};

        // put model state from form
        var autoDubField = document.getElementById("autoDub");
        formState.isAutoDubEnabled = autoDubField.checked;

        var displayBestField = document.getElementById("displayBest");
        formState.isDisplayBestEnabled = displayBestField.checked;

        var bestQualityField = document.getElementById("bestQuality");
        formState.isBestQualityEnabled = bestQualityField.checked;

        var soundsField = document.getElementById("sounds");
        formState.isSoundsEnabled = soundsField.checked;

        var effectsField = document.getElementById("effects");
        formState.isEffectsEnabled = effectsField.checked;

        var callerField = document.getElementById("caller");
        formState.isCallerEnabled = callerField.checked;

        this._saveOptions(formState);
    };

	this._saveOptions = function(formState) {
		this._controller.updateState(formState.isAutoDubEnabled, formState.isDisplayBestEnabled, formState.isBestQualityEnabled,
            formState.isSoundsEnabled, formState.isEffectsEnabled, formState.isCallerEnabled);
	};

    this._getOptions = function() {
        var modelState = {},
            gameSettings = this._model.getGameSettings(),
            graphicsSettings = this._model.getGraphicsSettings(),
            soundsSettings = this._model.getSoundsSettings();

        modelState.isAutoDubEnabled = gameSettings.getAutoDub();
        modelState.isDisplayBestEnabled = gameSettings.getDisplayBest();
        modelState.isBestQualityEnabled = graphicsSettings.getBestQuality();
        modelState.isSoundsEnabled = soundsSettings.getSounds();
        modelState.isEffectsEnabled = soundsSettings.getEffects();
        modelState.isCallerEnabled = soundsSettings.getCaller();

        return modelState;
    };

    this._model.setOnStateChangedHandler(this.modelActionsHandler);
};



/*
 * Using.
 */
// Model
var options = new Options(new GameSettings(true, false), new GraphicsSettings(
		false), new SoundsSettings(true, true, true));

// Controller
var optionsController = new OptionsController(options);

// View
var optionsView = new OptionsView("script-holder-1", options, optionsController);

optionsView.render();

// mocked saving state
var saveFormState = function(){
    optionsView.formActionsHandler();
};