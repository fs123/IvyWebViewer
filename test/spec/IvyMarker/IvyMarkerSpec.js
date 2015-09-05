'use strict';

var log4js = require('log4js');
var logger = log4js.getLogger();
var IvyMarker = require('../../../src/lib/feature/IvyMarker');

describe('IvyMarker test suite', function() {

    // Consider that a direct call won't work ... e.g.: beforeEach(setUp());
    beforeEach(function() {
        setUp('IvyMarker test');
    });

    afterEach(function() {
        tearDown('IvyMarker test');
    });

    it("contains spec with an expectation", function() {
        logger.debug('logging test' + IvyMarker);
        expect(true).toBe(true);
    });

});