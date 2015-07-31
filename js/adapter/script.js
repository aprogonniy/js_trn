/**
 * Adapter pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Constants.
 */
var VOLUME_DEFAULT = 0,
	VOLUME_MIDDLE = 5;

/*
 * Target interface.
 */
var ISpeakerDriver = function () {
	this.enable = function () { };
	this.disable = function () { };
	this.record = function () { };
	this.play = function () { };

	this.setDevice = function (device) { };
	this.getDevice = function () { };
};

/*
 * Adaptee classes.
 */
var Jabra = function (uid) {
	this._uid = uid;
	this._isEnabled = false;
	this._isMutted = false;
	this._volume = VOLUME_DEFAULT;

	this.switchOn = function () {
		this._isEnabled = true;
		this._volume = VOLUME_MIDDLE;
	};
	this.switchOff = function () {
		this._isEnabled = false;
	};

	this.enableMicrophoneMode = function () {
		// mocked
		console.log(" < Jabra is recording the voice.");
	};
	this.enableSpeakerMode = function () {
		// mocked
		console.log(" > Jabra is playing the record.");
	};

	this.mute = function () {
		this._isMutted = true;
	};
	this.unMute = function () {
		this._isMutted = false;
	};

	this.adjustVolume = function (volumeLevel) {
		this._volume = volumeLevel;
	};
};

var Headphones = function (uid) {
	this._uid = uid;
	this._isMicrophoneEnabled = false;
	this._isSpeakersEnabled = false;
	this._volume = VOLUME_DEFAULT;

	this.connect = function () {
		this._isMicrophoneEnabled = true;
		this._isSpeakersEnabled = true;
	};
	this.disconnect = function () {
		this._isMicrophoneEnabled = false;
		this._isSpeakersEnabled = false;
	};

	this.record = function () {
		if (this._isMicrophoneEnabled !== false) {
			// mocked
			console.log(" < Headphones are recording the voice.");
		}
	};
	this.play = function () {
		if (this._isSpeakersEnabled !== false) {
			// mocked
			console.log(" < Headphones are playing the record.");
		}
	};

	this.adjustVolume = function (volumeLevel) {
		this._volume = volumeLevel;
	};
};

/*
 * Adapter classes.
 */
var JabraDriver = function () {
	this._device = null;

	this.enable = function () {
		this._device.switchOn();
	};
	this.disable = function () {
		this._device.switchOff();
	};
	this.record = function () {
		this._device.enableMicrophoneMode();
	};
	this.play = function () {
		this._device.enableSpeakerMode();
	};

	this.setDevice = function (device) {
		this._device = device;
	};
	this.getDevice = function () {
		return this._device;
	};
};
JabraDriver.prototype = new ISpeakerDriver();

var HeadphonesDriver = function () {
	this._device = null;

	this.enable = function () {
		this._device.connect();
	};
	this.disable = function () {
		this._device.disconnect();
	};
	this.record = function () {
		this._device.record();
	};
	this.play = function () {
		this._device.play();
	};

	this.setDevice = function (device) {
		this._device = device;
	};
	this.getDevice = function () {
		return this._device;
	};
};
HeadphonesDriver.prototype = new ISpeakerDriver();



/*
 * Using.
 */
var drivers = [];
drivers.push(new JabraDriver());
drivers.push(new HeadphonesDriver());

drivers[0].setDevice(new Jabra("sgm-1-jabra-device"));
drivers[1].setDevice(new Headphones("sgm-1-headphones-panasonic"));

console.info("Enabling devices");
for (var index in drivers) {
	drivers[index].enable();
}

console.info("Recording sound");
for (var index in drivers) {
	drivers[index].record();
}

console.info("Playing sound");
for (var index in drivers) {
	drivers[index].play();
}