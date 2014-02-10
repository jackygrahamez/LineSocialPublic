module.exports = function(grunt) {


  grunt.initConfig({
    mochaSelenium: {
      options: {
        // Mocha options
        reporter: 'spec',
        timeout: 30e3,
        // Toggles wd's promises API, default:false
        usePromises: false
      },
      firefox: {
        src: ['test/*.js']
        // firefox is the default browser, so no browserName option required
      },
      chrome: {
        src: ['test/*.js'],
        options: {
          // Chrome browser must be installed from Chromedriver support
          browserName: 'chrome'
        }
      },
      phantomjs: {
        src: ['test/*.js'],
        options: {
          // phantomjs must be in the $PATH when invoked
          browserName: 'phantomjs'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-selenium');

  grunt.registerTask('test', ['mochaSelenium']);

  //grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};