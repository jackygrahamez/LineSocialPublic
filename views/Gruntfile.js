module.exports = function(grunt) {

/*
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
*/

  grunt.initConfig({
    mochaSelenium: {
      options: {
        // Mocha options
        reporter: 'spec',
        timeout: 30e3,
        // Toggles wd's promises API, default:false
        usePromises: false
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
    },
    serverFile: 'app.js',
    shell: {
      nodemon: {
        command: 'nodemon <%= serverFile %>',
        options: {
          stdout: true,
          stderr: true
        }
      }
    },
    watch: { /* nothing to do in watch anymore */ }    
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-selenium');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');  

  grunt.registerTask('test', ['shell:nodemon', 'mochaSelenium']);

  //grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};