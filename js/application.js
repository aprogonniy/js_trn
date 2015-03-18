/**
 * Patterns launcher.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Application constants.
 */
var PATTERN_VALUES = [
	"decorator",
	"factory",
	"factory_method",
	"proxy",
	"observer",
	"prototype",
	"flyweight"
];
var JS_DIR = "js/";

/*
 * Parse URL params.
 */
var regex = /[?]([^=#]+)/g,
	url = window.location.href,
	$_GET = [],
	match;
while (match = regex.exec(url)) {
	$_GET.push(match[1]);
}

/*
 * Get current pattern value.
 */
var currentPattern = null;
for (var j = 0; j < $_GET.length; j++) {
	for (var i = PATTERN_VALUES.length - 1; i >= 0; i--) {
		if (PATTERN_VALUES[i] == $_GET[j]) {
			currentPattern = PATTERN_VALUES[i];
			break;
		}
	}
}

/*
 * Load requested pattern.
 */
if (currentPattern !== null) {
	// Requested pattern is presented in PATTERN_VALUES array
	var filename = JS_DIR + currentPattern + "/script.js";
	var fileref = document.createElement('script')
	fileref.setAttribute("type", "text/javascript")
	fileref.setAttribute("src", filename);
	document.getElementsByTagName("head")[0].appendChild(fileref);
} else {
	// There is no coincidence between $_GET and PATTERN_VALUES arrays
	var errorMessage = "<div class=\"error\">Unknown pattern should be load. Please add \"?\{PATTERN_NAME\}\" parameter to page URL.<br><br>Available values: <ul>";
	for (var j = 0; j < PATTERN_VALUES.length; j++) {
		errorMessage += "<li><a href=\"?" + PATTERN_VALUES[j] + "\">" + PATTERN_VALUES[j] + "</a></li>";
	}
	errorMessage += "</ul></div>";

	document.write(errorMessage);
}