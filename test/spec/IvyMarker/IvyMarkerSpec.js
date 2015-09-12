'use strict';

var testHelper = require('../helpers/index.js'),
    IvyMarker = require('../../../src/lib/feature/IvyMarker');

describe('IvyMarker', function () {

    // Consider that a direct call won't work ... e.g.: beforeEach(setUp());
    beforeEach(function () {
        testHelper.setUp('IvyMarker test');
        var container = '<div id="container"></div>';
        document.body.insertAdjacentHTML('afterbegin', container);
    });

    afterEach(function () {
        testHelper.tearDown('IvyMarker test');
        document.body.removeChild(document.getElementById('container'));
    });

    it('test case 1', function () {
        var test = document.getElementById('container');
        expect(test).not.to.equal('undefined');
    });

    //it('second test case', function () {
    //    expect(true).toBe(true);
    //});

});