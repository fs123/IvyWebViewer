'use strict';

// use the helper from bpmn-js
module.exports = require('bpmn-js/test/helper');

/* helpers, which should be globally accessible, should be defined here and be bound to the global object.
 see https://github.com/jasmine/jasmine-npm/issues/25

 The following function is a simple example.
 */

function setUp(name) {
    console.log('setting up test: ' + name);
}
module.exports.setUp = (window || global).setUp = setUp;

function tearDown(name) {
    console.log('tearing down test: ' + name);
}
module.exports.tearDown = (window || global).tearDown = tearDown;
