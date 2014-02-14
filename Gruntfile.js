'use strict';

module.exports = function (grunt) {

    // hardcoded paths
        var protractorPath ='node_modules/protractor/bin/protractor';       //non-Windows
        var pathPrefix ='';
        pathPrefix ='node_modules/protractor/';
        var seleniumStartupParts =['java', '-jar', pathPrefix+'selenium/selenium-server-standalone-2.39.0.jar', '-p', '4444', '-Dwebdriver.chrome.driver='+pathPrefix+'selenium/chromedriver'];
        var seleniumStartup =seleniumStartupParts.join(' ');
        var seleniumStartupCmd =seleniumStartupParts[0];
        var seleniumStartupArgs =seleniumStartupParts.slice(1, seleniumStartupParts.length);
        
        var seleniumShutdown ='http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer';
    

    // Project configuration.
    grunt.initConfig({
        develop: {
            server: {
                file: 'app.js',
                nodeArgs: ['--debug']
            }
        },
        protractor_webdriver: {
            your_target: {
                options: {
                    path: 'node_modules/protractor/bin/',
                    command: 'webdriver-manager start',
                }
            }
        },
        protractor: {
            options: {
                configFile: "node_modules/protractor/referenceConf.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                // Arguments passed to the command
                }
            },
            your_target: {
                options: {
                configFile: "example/conf.js", // Target-specific config file
                args: {} // Target-specific arguments
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-develop');
     

    // Default task.
    //grunt.registerTask('default', ['jshint', 'jasmine_node', 'browserify', 'jasmine', 'uglify']);
    grunt.registerTask('default', ['develop', 'protractor_webdriver', 'protractor']);
};
