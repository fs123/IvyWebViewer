'use strict';

var BpmnViewer = require('../../../src/lib/IvyWebViewer/IvyWebViewer.js');
var xml = require('../../fixtures/simple.bpmn');

describe('IvyMarker integration test', function () {

    var container;
    var ivyMarker;

    beforeEach(function () {
        document.body.innerHTML = '<div id="container"></div>';
        container = document.getElementById('container');
    });

    afterEach(function () {
        document.body.removeChild(document.getElementById('container'));
    });

    function createViewer(xml, done) {
        var viewer = new BpmnViewer({container: container});

        viewer.importXML(xml, function (err, warnings) {
            ivyMarker = viewer.get('ivyMarker');
            done(err, warnings, viewer);
        });
    }

    it('should bootstrap', function (done) {
        createViewer(xml, function (err, warnings, bpmnViewer) {
            console.log(document);
            expect(bpmnViewer).to.be.defined;
            expect(bpmnViewer.get('ivyMarker')).to.be.defined;
            expect(ivyMarker).to.be.defined;
            expect(ivyMarker).to.equal(bpmnViewer.get('ivyMarker'));
            done();
        });
    });

    it('should highlight a single task element', function (done) {
        createViewer(xml, function (err, warnings, bpmnViewer) {
            // perform highlighting
            ivyMarker.highlightExecutedElements(['Task_1']);

            // get the registry and the element
            var registry = bpmnViewer.get('elementRegistry');
            var task_1 = registry.get('Task_1');
            expect(task_1).to.be.defined;

            // proof that the element is marked/highlighted
            var canvas = bpmnViewer.get('canvas');
            expect(canvas.hasMarker(task_1, 'executed-element')).to.be.true;

            done();
        });
    });

    it('should highlight multiple task elements', function (done) {
        createViewer(xml, function (err, warnings, bpmnViewer) {
            // perform highlighting
            ivyMarker.highlightExecutedElements(['StartEvent_1', 'Task_1']);

            // get the registry and the elements
            var registry = bpmnViewer.get('elementRegistry');
            var startEvent_1 = registry.get('StartEvent_1');
            var task_1 = registry.get('Task_1');

            // proof that the elements are marked/highlighted
            var canvas = bpmnViewer.get('canvas');
            expect(canvas.hasMarker(startEvent_1, 'executed-element')).to.be.true;
            expect(canvas.hasMarker(task_1, 'executed-element')).to.be.true;

            done();
        });
    });

    it('should highlight a single sequence flow', function (done) {
        createViewer(xml, function (err, warnings, bpmnViewer) {
            // perform highlighting
            ivyMarker.highlightExecutedElements(['SequenceFlow_1']);

            // get the registry and the element
            var registry = bpmnViewer.get('elementRegistry');
            var sequenceFlow_1_gfx = registry.getGraphics('SequenceFlow_1');

            // proof the structure of a marked/highlighted sequence flow
            var djsVisual = sequenceFlow_1_gfx.node.firstChild;
            expect(djsVisual.getAttribute('class')).to.equal('djs-visual');
            expect(djsVisual.childNodes.length).to.equal(2);
            expect(djsVisual.lastChild.getAttribute('class')).to.equal('executed-sequence');

            done();
        });
    });

    it('should unhighlight all elements', function (done) {
        createViewer(xml, function (err, warnings, bpmnViewer) {
            // perform highlighting
            ivyMarker.highlightExecutedElements(['StartEvent_1', 'Task_1', 'SequenceFlow_1']);

            // get the registry and the elements
            var registry = bpmnViewer.get('elementRegistry');
            var startEvent_1 = registry.get('StartEvent_1');
            var task_1 = registry.get('Task_1');
            var sequenceFlow_1_gfx = registry.getGraphics('SequenceFlow_1');

            // perform unhighlighting
            ivyMarker.unhighlightAllElements();

            // proof that the elements are not highlighted anymore
            var canvas = bpmnViewer.get('canvas');
            expect(canvas.hasMarker(startEvent_1, 'executed-element')).to.be.false;
            expect(canvas.hasMarker(task_1, 'executed-element')).to.be.false;
            var djsVisual = sequenceFlow_1_gfx.node.firstChild;
            expect(djsVisual.childNodes.length).to.equal(1);
            expect(djsVisual.lastChild.getAttribute('class')).to.not.equal('executed-sequence');

            done();
        });
    });
});