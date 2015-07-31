/**
 * MVVM pattern implementation.
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

    this.setGameSettingsAutoDub = function(autoDubState) {
        this._gameSettings.setAutoDub(autoDubState);

        if(this._onStateChangedHandler !== null) {
            this._onStateChangedHandler.call();
        }
    };
    this.getGameSettingsAutoDub = function() {
        return this._gameSettings.getAutoDub();
    };

    this.setGameSettingsDisplayBest = function(displayBestState) {
        this._gameSettings.setDisplayBest(displayBestState);

        if(this._onStateChangedHandler !== null) {
            this._onStateChangedHandler.call();
        }
    };
    this.getGameSettingsDisplayBest = function() {
        return this._gameSettings.getDisplayBest();
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

    this.setGraphicsSettingsBestQuality = function(bestQualityState) {
        this._graphicsSettings.setBestQuality(bestQualityState);

        if(this._onStateChangedHandler !== null) {
            this._onStateChangedHandler.call();
        }
    };
    this.getGraphicsSettingsBestQuality = function() {
        return this._graphicsSettings.getBestQuality();
    };

    this.setSoundsSettings = function(soundsSettings) {
        if (soundsSettings instanceof SoundsSettings) {
            this._soundsSettings = soundsSettings;

            if(this._onStateChangedHandler !== null) {
                this._onStateChangedHandler.call();
            }
        }
    };
    this.getSoundsSettingsSounds = function() {
        return this._soundsSettings;
    };

    this.setSoundsSettingsSounds = function(soundsState) {
        this._soundsSettings.setSounds(soundsState);

        if(this._onStateChangedHandler !== null) {
            this._onStateChangedHandler.call();
        }
    };
    this.getSoundsSettingsSounds = function() {
        return this._soundsSettings.getSounds();
    };

    this.setSoundsSettingsEffects = function(effectsState) {
        this._soundsSettings.setEffects(effectsState);

        if(this._onStateChangedHandler !== null) {
            this._onStateChangedHandler.call();
        }
    };
    this.getSoundsSettingsEffects = function() {
        return this._soundsSettings.getEffects();
    };

    this.setSoundsSettingsCaller = function(callerState) {
        this._soundsSettings.setCaller(callerState);

        if(this._onStateChangedHandler !== null) {
            this._onStateChangedHandler.call();
        }
    };
    this.getSoundsSettingsCaller = function() {
        return this._soundsSettings.getCaller();
    };



    this.setOnStateChangedHandler = function(callback) {
        this._onStateChangedHandler = callback;
    };
};

/*
 * ViewModels.
 */
var OptionsViewModel = function(model) {
    this._model = null;
    if (model !== null && model !== undefined && model instanceof Options) {
        this._model = model;
    }

    this._view = null;

    this.setView = function(view) {
        if (view !== null && view !== undefined && view instanceof OptionsView) {
            this._view = view;
        }
    };

    this.getView = function() {
        return this._view;
    };

    this._isValidState = function(option) {
        var result = false;

        if(typeof option === "boolean") {
            result = true;
        }

        return result;
    };

    this._modelActionsHandler = function() {
        console.log("Model changed");
    };

    this.setGameSettingsAutoDub = function(autoDubState) {
        if(this._isValidState(autoDubState)) {
            this._model.setGameSettingsAutoDub(autoDubState);
        }
    };
    this.getGameSettingsAutoDub = function() {
        return this._model.getGameSettingsAutoDub();
    };

    this.setGameSettingsDisplayBest = function(displayBestState) {
        if(this._isValidState(displayBestState)) {
            this._model.setGameSettingsDisplayBest(displayBestState);
        }
    };
    this.getGameSettingsDisplayBest = function() {
        return this._model.getGameSettingsDisplayBest();
    };


    this.setGraphicsSettingsBestQuality = function(bestQualityState) {
        if(this._isValidState(bestQualityState)) {
            this._model.setGraphicsSettingsBestQuality(bestQualityState);
        }
    };
    this.getGraphicsSettingsBestQuality = function() {
        return this._model.getGraphicsSettingsBestQuality();
    };

    this.setSoundsSettingsSounds = function(soundsState) {
        if(this._isValidState(soundsState)) {
            this._model.setSoundsSettingsSounds(soundsState);
        }
    };
    this.getSoundsSettingsSounds = function() {
        return this._model.getSoundsSettingsSounds();
    };

    this.setSoundsSettingsEffects = function(effectsState) {
        if(this._isValidState(effectsState)) {
            this._model.setSoundsSettingsEffects(effectsState);
        }
    };
    this.getSoundsSettingsEffects = function() {
        return this._model.getSoundsSettingsEffects();
    };

    this.setSoundsSettingsCaller = function(callerState) {
        if(this._isValidState(callerState)) {
            this._model.setSoundsSettingsCaller(callerState);
        }
    };
    this.getSoundsSettingsCaller = function() {
        return this._model.getSoundsSettingsCaller();
    };



    this.render = function() {
        this._view.render();
    };

    this._model.setOnStateChangedHandler(this._modelActionsHandler);
};

/*
 * Views.
 */
var OptionsView = function(containerName, viewModel) {
    this._viewModel = null;
    if (viewModel !== null && viewModel !== undefined
        && viewModel instanceof OptionsViewModel) {
        this._viewModel = viewModel;
    }

    this._containerName = containerName;

    this._template = "<form id='options-form' name='options-panel' method='get' onsubmit='return false;'><label>GameSettings</label><br /><input id='autoDub' type='checkbox' value='true' onclick='changeAutoDub();' />Auto dub<br /><input id='displayBest' type='checkbox' value='true' onclick='changeDisplayBest();' />Display my best<br /><br /><label>GraphicsSettings</label><br /><input id='bestQuality' type='checkbox' value='true' onclick='changeBestQuality();' />Best quality<br /><br /><label>SoundsSettings</label><br /><input id='sounds' type='checkbox' value='true' onclick='changeSounds();' />All sounds<br /><input id='effects' type='checkbox' value='true' onclick='changeEffects();' />Sound effects<br /><input id='caller' type='checkbox' value='true' onclick='changeCaller();' />Caller voice</form>";

    this.render = function() {
        var container = document.getElementById(containerName);

        if(!!!document.getElementById('options-form')) {
            container.innerHTML = this._template;
        }

        // put model state to form
        var autoDubField = document.getElementById("autoDub");
        autoDubField.checked = this._viewModel.getGameSettingsAutoDub();

        var displayBestField = document.getElementById("displayBest");
        displayBestField.checked = this._viewModel.getGameSettingsDisplayBest();

        var bestQualityField = document.getElementById("bestQuality");
        bestQualityField.checked = this._viewModel.getGraphicsSettingsBestQuality();

        var soundsField = document.getElementById("sounds");
        soundsField.checked = this._viewModel.getSoundsSettingsSounds();

        var effectsField = document.getElementById("effects");
        effectsField.checked = this._viewModel.getSoundsSettingsEffects();

        var callerField = document.getElementById("caller");
        callerField.checked = this._viewModel.getSoundsSettingsCaller();
    };

    this.changeAutoDub = function() {
        var autoDubField = document.getElementById("autoDub");
        this._viewModel.setGameSettingsAutoDub(autoDubField.checked);
    };
    this.changeDisplayBest = function() {
        var displayBestField = document.getElementById("displayBest");
        this._viewModel.setGameSettingsDisplayBest(displayBestField.checked);
    };
    this.changeBestQuality = function() {
        var bestQualityField = document.getElementById("bestQuality");
        this._viewModel.setGraphicsSettingsBestQuality(bestQualityField.checked);
    };
    this.changeSounds = function() {
        var soundsField = document.getElementById("sounds");
        this._viewModel.setSoundsSettingsSounds(soundsField.checked);
    };
    this.changeEffects = function() {
        var effectsField = document.getElementById("effects");
        this._viewModel.setSoundsSettingsEffects(effectsField.checked);
    };
    this.changeCaller = function() {
        var callerField = document.getElementById("caller");
        this._viewModel.setSoundsSettingsCaller(callerField.checked);
    };
};



/*
 * Using.
 */
// Model
var options = new Options(new GameSettings(true, false), new GraphicsSettings(
    false), new SoundsSettings(true, true, true));

// Presenter
var optionsViewModel = new OptionsViewModel(options);

// View
var optionsView = new OptionsView("script-holder-1", optionsViewModel);

optionsViewModel.setView(optionsView);
optionsViewModel.render();

// mocked saving state
var changeAutoDub = function(){
    optionsView.changeAutoDub();
};
var changeDisplayBest = function(){
    optionsView.changeDisplayBest();
};
var changeBestQuality = function(){
    optionsView.changeBestQuality();
};
var changeSounds = function(){
    optionsView.changeSounds();
};
var changeEffects = function(){
    optionsView.changeEffects();
};
var changeCaller = function(){
    optionsView.changeCaller();
};