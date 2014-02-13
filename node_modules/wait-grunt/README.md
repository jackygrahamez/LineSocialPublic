# wait-grunt

> An alternative to the Grunt command line interface. Ability to fork Grunt but have it wait for a signal before executing.

```shell
npm install wait-grunt --save-dev
```

```js
var fork = require('child_process').fork;
var path = require('path');

// create a fork that waits to be executed
var child = fork('./node_modules/.bin/wait-grunt');

// 5s later, run the jshint task
setTimeout(function() {
  child.send('jshint --verbose');
}, 5000);
```
