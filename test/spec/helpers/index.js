'use strict';

/* helpers, which should be globally accessible, should be defined here and be bound to the global object.
see https://github.com/jasmine/jasmine-npm/issues/25

The following function is a simple example.
*/

console.log("Initializing helper functions");

global.setUp = function (name) {
    console.log('setting up test: ' + name);
};

global.tearDown = function (name) {
    console.log('tearing down test: ' + name);
};