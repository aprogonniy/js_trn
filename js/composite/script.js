/*
 * Constants.
 */
var AUTHOR_DEFAULT = "Anonymous",
	TYPE_DEFAULT = "media",
	SIZE_MEDIA = 120;

/*
 * Component interface.
 */
var IFile = function (name, extension) {
	this.copy = function () { };
	this.rename = function (name) { };
	this.convert = function (extension) { };
	this.getSize = function () { };
	this.getInfo = function () { };
};

/*
 * Leafs classes.
 */
var TextFile = function (name, extension, content) {
	this._name = name;
	this._extension = extension;

	this._content = "";
	if (content !== undefined && content !== null) {
		this._content = content;
	}

	this.copy = function () {
		return Object.clone(this);
	};

	this.rename = function (name) {
		this._name = name;
	};

	this.convert = function (extension) {
		this._extension = extension;
	};

	this.getSize = function () {
		return this._content.length;
	};

	this.getInfo = function () {
		return this._name + "." + this._extension;
	};
};
TextFile.prototype = new IFile();

var MediaFile = function (name, extension, author, type, codec) {
	this._name = name;
	this._extension = extension;
	this._codec = codec;

	this._author = AUTHOR_DEFAULT;
	if (author !== undefined && author !== null) {
		this._author = author;
	}

	this._type = TYPE_DEFAULT;
	if (type !== undefined && type !== null) {
		this._type = type;
	}

	this.copy = function () {
		return Object.clone(this);
	};

	this.rename = function (name) {
		this._name = name;
	};

	this.convert = function (extension) {
		this._extension = extension;
		this._type = TYPE_DEFAULT;
		this._codec = null;
	};

	this.getSize = function () {
		return this._codec * SIZE_MEDIA;
	};

	this.getInfo = function () {
		return this._name + "." + this._extension + "(" +
			this._type + ", " + this._codec + ")" + " _by @" +
			this._author;
	};
};
MediaFile.prototype = new IFile();


/*
 * Composite.
 */
var Directory = function () {
	this._files = [];

	this.addFile = function (file) {
		this._files.push(file);
	};

	this.deleteFile = function (file) {
		for (var i = 0; i < this._files.length; i++) {
			if (this._files[i].getInfo() === file.getInfo() && this._files[i].getSize() === file.getSize()) {
				this._files.splice(i, 1);
			}
		}
	};

	this.getFileList = function () {
		var fileListNames = [];
		for (var i = 0; i < this._files.length; i++) {
			fileListNames.push(this._files[i].getInfo());
		}

		return fileListNames.join("\n");
	};

	this.renameFiles = function (name) {
		for (var i = 0; i < this._files.length; i++) {
			this._files[i].rename(name);
		}
	};
};


/*
 * Using.
 */
var dir = new Directory();
console.info("Initial state");
console.log(dir.getFileList());

dir.addFile(new TextFile("test", "txt"));
dir.addFile(new MediaFile("video", "avi", "olepro", "movie", "h.264"));
console.info("Dir with files");
console.log(dir.getFileList());

dir.renameFiles("lol");
console.info("Renamed files");
console.log(dir.getFileList());