module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		// Check code style rules.
		jshint: {
			options: {
				jshintrc: "../jshint/.jshintrc"
			},
			all: [ "../../src/js/{,*/}*.js" ]
		}

	});

	// Load the plugins that provides the "default" task.
	grunt.loadNpmTasks("grunt-contrib-jshint");

	// Default task(s).
	grunt.registerTask("default", [ ]);

	grunt.registerTask("hint", [
        "jshint"
    ]);
};
