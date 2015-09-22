'use strict';

var
    //testHelper = require('../helpers/index.js'),
    //coreModule = require('bpmn-js/lib/core'),
    BpmnViewer = require('../../../src/lib/IvyWebViewer/IvyWebViewer.js'),
    IvyMarker = require('../../../src/lib/feature/IvyMarker');

var xml = require('../../fixtures/simple.bpmn');

describe('IvyMarker', function () {

    //beforeEach(bootstrapViewer(xml, { modules: [ coreModule, IvyMarker ] }));

    //afterEach(function () {
    //    //testHelper.tearDown('IvyMarker test');
    //    //document.body.removeChild(document.getElementById('container'));
    //});

    //it('should bootstrap diagram with ivyMarker', inject(function (ivyMarker) {
    //    expect(ivyMarker).to.be.an('object');
    //}));
    //
    //it('single element has executed-element marker after highlighting', inject(function (ivyMarker, elementRegistry) {
    //
    //    ivyMarker.highlightExecutedElements(['Task_1']);
    //
    //    var element = elementRegistry.get('Task_1');
    //    expect(element).to.be.an('object');
    //
    //    expect(canvas.hasMarker(element, 'executed-element')).to.be(true);
    //
    //    //expect(true).to.be.true;
    //}));

    var bpmnViewer;

    beforeEach(function() {
        document.body.innerHTML = '<div id="container"></div>';
        bpmnViewer = new BpmnViewer({
            container: '#container',
            width: '1000px',
            height: '700px'
        });
    });

    afterEach(function() {
        document.body.removeChild(document.getElementById('container'));
        bpmnViewer = null;
    });

    describe('bootstrap', function() {
        expect(bpmnViewer).to.be.defined;
    });

});
