'use strict';

describe("A suite", function() {

    beforeEach(setUp());
    afterEach(tearDown());

    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
    });
});