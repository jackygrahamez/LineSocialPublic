var assert = require('assert');
var fork = require('child_process').fork;
var path = require('path');

// start time
var start = Date.now();
var delay = 3000;

// create a fork that waits to be executed
var child = fork(path.join(__dirname, '../bin/wait-grunt'));

// 5s later, run the jshint task
setTimeout(function() {
  child.send('jshint --verbose');
}, delay);

process.on('exit', function() {
  assert((Date.now() - start) > delay, 'execution time should have been over ' + delay);
});
