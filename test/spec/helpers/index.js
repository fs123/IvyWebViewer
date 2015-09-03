'use strict';

/* helpers, which should be globally accessible, should be defined here and be bound to the global object.
see https://github.com/jasmine/jasmine-npm/issues/25

The following function is a simple example.
*/

console.log("Initializing helper functions");

function setUp(name) {
    console.log('setting up test: ' + name);
}
global.setUp = setUp;

function tearDown() {
    console.log('tearing down test');
}
global.tearDown = tearDown;