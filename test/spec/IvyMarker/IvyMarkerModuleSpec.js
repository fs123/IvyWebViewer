'use strict';

var IvyMarker = require('../../../src/lib/feature/IvyMarker/IvyMarker');

/*
 * These libraries are only necessary for the sinon attempt
 */
//Canvas = require('../../../node_modules/bpmn-js/node_modules/diagram-js/lib/core/Canvas'),
//ElementRegistry = require('../../../node_modules/bpmn-js/node_modules/diagram-js/lib/core/ElementRegistry'),
//sinon = require('sinon');

var divElement = '<div id="container"><div class="bjs-container" style="width: 100%; height: 100%; position: relative; "><div class="djs-container" style="position: relative; overflow-x: hidden; overflow-y: hidden; width: 100%; height: 100%; "><div class="djs-overlay-container" style="position: absolute; width: 0; height: 0;"></div><svg width="100%" height="100%" data-element-id="Process_1"><desc>Created with Snap</desc><defs><marker viewBox="0 0 20 20" markerWidth="10" markerHeight="10" orient="auto" refX="11" refY="10" id="markerSif2iy9hu4"><path d="M 1 5 L 11 10 L 1 15 Z" style="stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000px, 1px; " fill="#000000"></path></marker><marker viewBox="0 0 20 20" markerWidth="20" markerHeight="20" orient="auto" refX="6" refY="6" id="markerSif2iy9hu6"><circle cx="6" cy="6" r="3.5" style="stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000px, 1px; " fill="#ffffff" stroke="#000000"></circle></marker><marker viewBox="0 0 20 20" markerWidth="20" markerHeight="20" orient="auto" refX="8.5" refY="5" id="markerSif2iy9hu8"><path d="m 1 5 l 0 -3 l 7 3 l -7 3 z" style="stroke-width: 1px; stroke-linecap: butt; stroke-dasharray: 10000px, 1px; " fill="#ffffff" stroke="#000000"></path></marker><marker viewBox="0 0 20 20" markerWidth="10" markerHeight="10" orient="auto" refX="11" refY="10" id="markerSif2iy9hua"><path d="M 1 5 L 11 10 L 1 15" style="stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000px, 1px; " fill="#ffffff" stroke="#000000"></path></marker><marker viewBox="0 0 20 20" markerWidth="10" markerHeight="10" orient="auto" refX="-1" refY="10" id="markerSif2iy9huc"><path d="M 0 10 L 8 6 L 16 10 L 8 14 Z" style="stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000px, 1px; " fill="#ffffff" stroke="#000000"></path></marker><marker viewBox="0 0 20 20" markerWidth="10" markerHeight="10" orient="auto" refX="-5" refY="10" id="markerSif2iy9hue"><path d="M 1 4 L 5 16" style="stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000px, 1px; " fill="#000000" stroke="#000000"></path></marker></defs><g class="viewport"><g class="layer-base" data-element-id="Process_1"><g class="djs-group"><g class="djs-element djs-shape" data-element-id="SubProcess_1" transform="matrix(1,0,0,1,300,80)" style="display: block; "><g class="djs-visual"><rect x="0" y="0" width="300" height="300" rx="10" ry="10" style="stroke-width: 2px; " stroke="#000000" fill="#ffffff"></rect><text class=" djs-label" style="font-family: Arial, sans-serif; font-size: 12px; "><tspan x="109.5" y="20">Sub Process 1</tspan></text></g><rect x="0" y="0" width="300" height="300" style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></rect><rect x="-6" y="-6" width="312" height="312" style="" fill="none" class="djs-outline"></rect></g><g class="djs-children"><g class="djs-group"><g class="djs-element djs-shape" data-element-id="StartEvent_1" transform="matrix(1,0,0,1,352,242)" style="display: block; "><g class="djs-visual"><circle cx="18" cy="18" r="18" style="stroke-width: 2px; " stroke="#000000" fill="#ffffff"></circle></g><rect x="0" y="0" width="36" height="36" style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></rect><rect x="-6" y="-6" width="48" height="48" style="" fill="none" class="djs-outline"></rect></g></g><g class="djs-group"><g class="djs-element djs-shape" data-element-id="StartEvent_1_label" transform="matrix(1,0,0,1,325,278)" style="display: block; "><g class="djs-visual"><text class=" djs-label" style="font-family: Arial, sans-serif; font-size: 11px; "><tspan x="14" y="14">Start Event 1</tspan></text></g><rect x="0" y="0" width="90" height="20" style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></rect><rect x="-6" y="-6" width="102" height="32" style="" fill="none" class="djs-outline"></rect></g></g><g class="djs-group"><g class="djs-element djs-shape" data-element-id="Task_1" transform="matrix(1,0,0,1,420,220)" style="display: block; "><g class="djs-visual"><rect x="0" y="0" width="100" height="80" rx="10" ry="10" style="stroke-width: 2px; " stroke="#000000" fill="#ffffff"></rect><text class=" djs-label" style="font-family: Arial, sans-serif; font-size: 12px; "><tspan x="36.5" y="43.75">Task</tspan></text></g><rect x="0" y="0" width="100" height="80" style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></rect><rect x="-6" y="-6" width="112" height="92" style="" fill="none" class="djs-outline"></rect></g></g><g class="djs-group"><g class="djs-element djs-connection" data-element-id="SequenceFlow_1" style="display: block; "><g class="djs-visual"><path d="m  388,260L420,260 " style="stroke-width: 2px; stroke-linejoin: round; marker-end: url(#markerSif2iy9hu4); " fill="none" stroke="#000000"></path></g><polyline points="388,260 420,260 " style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></polyline><rect x="382" y="254" width="44" height="12" style="" fill="none" class="djs-outline"></rect></g></g><g class="djs-group"><g class="djs-element djs-shape" data-element-id="SequenceFlow_1_label" transform="matrix(1,0,0,1,359,250)" style="display: none; "><g class="djs-visual"><text class=" djs-label" style="font-family: Arial, sans-serif; font-size: 11px; "><tspan x="45" y="0"></tspan></text></g><rect x="0" y="0" width="90" height="20" style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></rect><rect x="-6" y="-6" width="102" height="32" style="" fill="none" class="djs-outline"></rect></g></g></g></g><g class="djs-group"><g class="djs-element djs-shape" data-element-id="EndEvent_1" transform="matrix(1,0,0,1,650,212)" style="display: block; "><g class="djs-visual"><circle cx="18" cy="18" r="18" style="stroke-width: 4px; " stroke="#000000" fill="#ffffff"></circle></g><rect x="0" y="0" width="36" height="36" style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></rect><rect x="-6" y="-6" width="48" height="48" style="" fill="none" class="djs-outline"></rect></g></g><g class="djs-group"><g class="djs-element djs-shape" data-element-id="EndEvent_1_label" transform="matrix(1,0,0,1,623,248)" style="display: block; "><g class="djs-visual"><text class=" djs-label" style="font-family: Arial, sans-serif; font-size: 11px; "><tspan x="21" y="14">End Event</tspan></text></g><rect x="0" y="0" width="90" height="20" style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></rect><rect x="-6" y="-6" width="102" height="32" style="" fill="none" class="djs-outline"></rect></g></g><g class="djs-group"><g class="djs-element djs-shape" data-element-id="StartEvent_2" transform="matrix(1,0,0,1,108,212)" style="display: block; "><g class="djs-visual"><circle cx="18" cy="18" r="18" style="stroke-width: 2px; " stroke="#000000" fill="#ffffff"></circle></g><rect x="0" y="0" width="36" height="36" style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></rect><rect x="-6" y="-6" width="48" height="48" style="" fill="none" class="djs-outline"></rect></g></g><g class="djs-group"><g class="djs-element djs-shape" data-element-id="StartEvent_2_label" transform="matrix(1,0,0,1,81,253)" style="display: block; "><g class="djs-visual"><text class=" djs-label" style="font-family: Arial, sans-serif; font-size: 11px; "><tspan x="33.5" y="14">Start</tspan></text></g><rect x="0" y="0" width="90" height="0" style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></rect><rect x="-6" y="-6" width="102" height="12" style="" fill="none" class="djs-outline"></rect></g></g><g class="djs-group"><g class="djs-element djs-connection" data-element-id="SequenceFlow_2" style="display: block; "><g class="djs-visual"><path d="m  600,230L650,230 " style="stroke-width: 2px; stroke-linejoin: round; marker-end: url(#markerSif2iy9hu4); " fill="none" stroke="#000000"></path></g><polyline points="600,230 650,230 " style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></polyline><rect x="594" y="224" width="62" height="12" style="" fill="none" class="djs-outline"></rect></g></g><g class="djs-group"><g class="djs-element djs-shape" data-element-id="SequenceFlow_2_label" transform="matrix(1,0,0,1,580,220)" style="display: none; "><g class="djs-visual"><text class=" djs-label" style="font-family: Arial, sans-serif; font-size: 11px; "><tspan x="45" y="0"></tspan></text></g><rect x="0" y="0" width="90" height="20" style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></rect><rect x="-6" y="-6" width="102" height="32" style="" fill="none" class="djs-outline"></rect></g></g><g class="djs-group"><g class="djs-element djs-connection" data-element-id="SequenceFlow_3" style="display: block; "><g class="djs-visual"><path d="m  144,230L300,230 " style="stroke-width: 2px; stroke-linejoin: round; marker-end: url(#markerSif2iy9hu4); " fill="none" stroke="#000000"></path></g><polyline points="144,230 300,230 " style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></polyline><rect x="138" y="224" width="168" height="12" style="" fill="none" class="djs-outline"></rect></g></g><g class="djs-group"><g class="djs-element djs-shape" data-element-id="SequenceFlow_3_label" transform="matrix(1,0,0,1,164,204)" style="display: block; "><g class="djs-visual"><text class=" djs-label" style="font-family: Arial, sans-serif; font-size: 11px; "><tspan x="33" y="14">Flow</tspan></text></g><rect x="0" y="0" width="90" height="21" style="stroke-opacity: 0; stroke-width: 15px; " fill="none" stroke="#ffffff" class="djs-hit"></rect><rect x="-6" y="-6" width="102" height="33" style="" fill="none" class="djs-outline"></rect></g></g></g></g></svg></div></div></div>';

describe('IvyMarker module test', function () {

    var ivyMarker;
    var canvasMock;
    var elementRegistryMock;

    beforeEach(function () {
        document.body.innerHTML = divElement;

        /*
         * Own mock attempt
         */
        canvasMock = new CanvasMock();
        elementRegistryMock = new ElementRegistryMock();
        ivyMarker = new IvyMarker(canvasMock, elementRegistryMock);

        /*
         * Sinon attempt
         */
        //var canvasMock = sinon.mock(new Canvas());
        //var elementRegistryMock = sinon.mock(new ElementRegistry());
        //ivyMarker = new IvyMarker(canvasMock, elementRegistryMock);
    });

    afterEach(function () {
        document.body.innerHTML = '';
    });

    it('should highlight a single task element', function () {
        ivyMarker.highlightExecutedElements(['Task_1']);

        // verify that IvyMarker called Canvas correctly, Canvas itself does not have to be tested here.
        var addMarkerExp = canvasMock.expectation.addMarker;
        expect(addMarkerExp.length).to.equal(1);
        expect(addMarkerExp[0].element.id).to.equal('Task_1');
        expect(addMarkerExp[0].marker).to.equal('executed-element');

        // verify that IvyMarker did the correct DOM manipulation

    });

    it('second test to verify mock', function () {
        ivyMarker.highlightExecutedElements(['Task_1']);
        console.log('calls: ' + canvasMock.expectation.addMarker.length);
    });

});

var CanvasMock = function() {
    this.expectation = {};
    this.addMarker = function (element, marker) {
        if (!this.expectation.addMarker) {
            this.expectation.addMarker = [];
        }
        this.expectation.addMarker.push({
            element: element,
            marker: marker
        });
    };
    this.removeMarker =  function (element, marker) {
        if (!this.expectation.removeMarker) {
            this.expectation.removeMarker = [];
        }
        this.expectation.removeMarker.push({
            element: element,
            marker: marker
        });
    };
};

var ElementRegistryMock = function() {
    var elements = {
        Task_1: {
            id: 'Task_1',
            type: 'bpmn:Task'
        },
        SequenceFlow_1: {
            id: 'SequenceFlow_1',
            type: 'bpmn:SequenceFlow'
        }
    };
    this.get = function (elementId) {
        return elements[elementId];
    };
    this.getAll = function () {
        return elements;
    };
};

//var canvasMock = {
//    expectation: {},
//    addMarker: function (element, marker) {
//        if (!this.expectation.addMarker) {
//            this.expectation.addMarker = [];
//        }
//        this.expectation.addMarker.push({
//            element: element,
//            marker: marker
//        });
//    },
//    removeMarker: function (element, marker) {
//        if (!this.expectation.removeMarker) {
//            this.expectation.removeMarker = [];
//        }
//        this.expectation.removeMarker.push({
//            element: element,
//            marker: marker
//        });
//    }
//};
//
//var elementRegistryMock = {
//    elements: {
//        Task_1: {
//            id: 'Task_1',
//            type: 'bpmn:Task'
//        },
//        SequenceFlow_1: {
//            id: 'SequenceFlow_1',
//            type: 'bpmn:SequenceFlow'
//        }
//    },
//    get: function (elementId) {
//        return this.elements[elementId];
//    },
//    getAll: function () {
//        return elements;
//    }
//};