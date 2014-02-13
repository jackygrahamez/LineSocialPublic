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
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        watch: {
            all: {
                files: ['src/**/*.*', 'test/**/*.*'],
                tasks: ['default']
            },
        },
        jasmine_node: {
            specNameMatcher: "Spec",
            specFolders: ["test/spec/common"],
            projectRoot: "test/spec/node",
            forceExit: true,
        },
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc',
            }
        },
        browserify: {
            main: {
                src: ['./src/browser/App.js'],
                dest: 'dist/app_bundle_main.js',
                options: {
                    alias: ["./src/browser/App.js:SampleApp"],
                    ignore: ['src/node/**/*.js'],
                },
            },
            src: {
                src: ['src/common/**/*.js', 'src/browser/**/*.js'],
                dest: 'dist/app_bundle.js',
                options: {
                    alias: ["./src/browser/App.js:SampleApp"],
                    externalize: ['src/common/**/*.js', 'src/browser/**/*.js'],
                    ignore: ['src/node/**/*.js'],
                }
            },
            test: {
                src: ['test/spec/common/**/*.js', 'test/spec/browser/**/*.js'],
                dest: 'dist/test_bundle.js',
                options: {
                    external: ['./src/**/*.js'],
                    ignore: ['./node_modules/underscore/underscore.js'],
                }
            },
        },
        jasmine : {
            src : 'dist/app_bundle.js',
            options : {
                specs : 'dist/test_bundle.js',
                vendor : ['libs/jquery-1.9.1.js', 'libs/underscore.js']
            }
        },
        uglify: {
            all: {
                files: {
                    'dist/app_bundle_min.js': ['dist/app_bundle.js']
                }
            },
            main: {
                files: {
                    'dist/app_bundle_main_min.js': ['dist/app_bundle_main.js']
                }
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
        },        
        shell: {
            protractor: {
                command: 'sleep 10 && node_modules/protractor/bin/protractor example/conf.js'
            },
            nodeServer: {
                options: {
                    stdout: true,
                    async: true
                },
                command: 'node app.js'
            },
            seleniumStartup: {
                options: {
                    stdout: true,
                    async: true
                },
                command: seleniumStartup
            }            
        },
        concurrent: {
            target1: ['shell:nodeServer', 'shell:seleniumStartup', 'shell:protractor']
        },
        wait: {
                options: {
                    delay: 500
                },
                pause: {      
                    options: {
                        before : function(options) {
                            console.log('pausing %dms', options.delay);
                        },
                        after : function() {
                            console.log('pause end');
                        }
                    }
                },
                random: {      
                    options: {
                        delay: 10,
                        after : function() {
                            console.log('gamble');
                            return Math.random() < 0.05 ? false : true;
                        }
                    }
                }
            },
        express: {
            server: {
              options: {
                port: 5000
              }
            }
        }                                              
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-wait');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-develop');

    grunt.registerTask('part1', ['concurrent:target1']);        

    // Default task.
    //grunt.registerTask('default', ['jshint', 'jasmine_node', 'browserify', 'jasmine', 'uglify']);
    grunt.registerTask('default', ['develop', 'protractor_webdriver', 'protractor']);
};
