'use strict';

require('../helpers/index.js');
var IvyMarker = require('../../../src/lib/feature/IvyMarker');


describe('IvyMarker test suite', function () {

    // Consider that a direct call won't work ... e.g.: beforeEach(setUp());
    beforeEach(function () {
        setUp('IvyMarker test');
    });

    afterEach(function () {
        //tearDown('IvyMarker test');
    });

    it("contains spec with an expectation", function () {
        expect(true).toBe(true);
    });

    it('second test case', function () {
        expect(true).toBe(true);
    });

});