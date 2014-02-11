;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
'use strict';

var HelloWorld = require('../../../src/common/HelloWorld');

describe("HelloWorld", function() {
    it("hello() should say hello when called", function() {
        expect(HelloWorld.hello()).toEqual("hello");
    });
});

describe("HelloUnderscore", function() {
    it("hello() should escape 'hello & hi' when called", function() {
        expect(HelloWorld.helloUnderscore()).toEqual("hello &amp; hi");
    });
});

},{"../../../src/common/HelloWorld":"wyGzT4"}],2:[function(require,module,exports){
'use strict';

var ReaderWriter = require('../../../src/common/PersistentReaderWriter');

/* Note: The test would use whichever implementation is given,
according to the environment the test is being run at (node/browser) */
describe("PersistentReaderWriter", function() {
    it("read() should read what was written with write()", function() {
        var key = "someKey";
        var randomValue = Math.random().toString();
        ReaderWriter.write(key, randomValue);
        expect(ReaderWriter.read(key)).toEqual(randomValue);
    });
});


},{"../../../src/common/PersistentReaderWriter":"Rsndal"}],3:[function(require,module,exports){
(function(){/* global window: false */

var App = require('../../../src/browser/App');
var HelloWorld = require('../../../src/common/HelloWorld');

describe("HelloJQuery", function() {
    it("running App.main() should create an element with 'hello' id, with text set to helloUnderscore()", function() {
        App.main();
        var expected = HelloWorld.helloUnderscore();
        var actual = window.document.getElementById('hello').innerHTML;
        expect(actual).toEqual(expected);
    });
});

})()
},{"../../../src/browser/App":"loZE7Z","../../../src/common/HelloWorld":"wyGzT4"}],4:[function(require,module,exports){
'use strict';

var HelloJquery = require('../../../src/browser/HelloJquery');

describe("HelloJQuery", function() {
    it("hello() should return a jquery element with hello innertext", function() {
        expect(HelloJquery.hello().text()).toEqual("hello");
    });
});


},{"../../../src/browser/HelloJquery":"onUfmh"}],5:[function(require,module,exports){

},{}],6:[function(require,module,exports){
// nothing to see here... no file methods for the browser

},{}]},{},[1,2,3,4])
;