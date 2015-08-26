'use strict';

var MARKER_EXECUTED_ELEMENT = 'executed-element',
    MARKER_EXECUTED_ARROW = 'executed-arrow';

function IvyMarker(canvas, elementRegistry) {

    var highlightElementsById = function (elementIds) {
        elementIds.forEach(highlightElementById);
        return elementIds;
    };

    var highlightElementById = function (elementId) {
        var element = elementRegistry.get(elementId);
        if (!element) {
            return;
        }

        if (element.type === 'bpmn:SequenceFlow') {
            highlightSequenceFlow(element);
        } else {
            highlightElement(element);
        }
    };

    var highlightSequenceFlow = function (element) {
        var djsVisual = document.querySelectorAll('*[data-element-id=' + element.id + '] .djs-visual')[0]; // get the first (and only) element
        var arrow = djsVisual.firstChild;
        // clone the arrow and set another CSS style (no marker-end, wider stroke, less opacity, ...)
        var arrowClone = arrow.cloneNode(true);
        arrowClone.removeAttribute('style');
        arrowClone.setAttribute('class', MARKER_EXECUTED_ARROW);
        // append the highlight arrow
        djsVisual.appendChild(arrowClone);
    };

    var highlightElement = function (element) {
        // set the rounded corners directly on the SVG element since it can not be set via CSS
        var djsOutline = document.querySelectorAll('*[data-element-id=' + element.id + '] .djs-outline')[0]; // get the first (and only) element
        djsOutline.setAttribute('rx', '10px');
        djsOutline.setAttribute('ry', '10px');
        // add the marker
        canvas.addMarker(element, MARKER_EXECUTED_ELEMENT);
    };

    this.highlightExecutedElements = highlightElementsById;

}

IvyMarker.$inject = ['canvas', 'elementRegistry'];

module.exports = IvyMarker;