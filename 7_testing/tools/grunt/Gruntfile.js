module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

        jsdoc: {
            api: {
                src: ["../../src/js/{,*/}*.js"],
                options: {
                    destination: "../../doc/",
                    readme: "../../src/readme.md"
                }
            }
        }
	});

	// Load the plugins that provides the "default" task.
	grunt.loadNpmTasks("grunt-jsdoc");

	// Default task(s).
	grunt.registerTask("default", [ ]);

    grunt.registerTask("doc", [
        "jsdoc"
    ]);
};
