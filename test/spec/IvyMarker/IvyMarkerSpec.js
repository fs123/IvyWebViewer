'use strict';

var testHelper = require('../helpers/index.js'),
    coreModule = require('bpmn-js/lib/core'),
    IvyMarker = require('../../../src/lib/feature/IvyMarker');

var xml = require('../../fixtures/simple.bpmn');

describe('IvyMarker', function () {

    beforeEach(bootstrapViewer(xml, { modules: [ coreModule, IvyMarker ] }));

    afterEach(function () {
        //testHelper.tearDown('IvyMarker test');
        //document.body.removeChild(document.getElementById('container'));
    });

    it('should bootstrap diagram with ivyMarker', inject(function (ivyMarker) {
        expect(ivyMarker).to.be.an('object');
    }));

    it('single element has executed-element marker after highlighting', inject(function (ivyMarker, elementRegistry, canvas) {
        ivyMarker.highlightExecutedElements(['Task_1']);
        var element = elementRegistry.get('Task_1');
        expect(element).to.be.an('object');
        expect(canvas.hasMarker(element, 'executed-element')).to.be(true);
        //expect(true).to.be.true;
    }));

});