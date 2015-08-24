'use strict';

var MARKER_EXECUTED_ELEMENT = 'executed-element',
    MARKER_EXECUTED_ARROW = 'executed-arrow';

function IvyMarker(eventBus, canvas, elementRegistry) {

    //eventBus.on('import.success', function (event) {
    //    // TODO: send request to REST API to get passed/highlighted elements
    //    highlightExecutedElements(executedElementIds);
    //});

    this.highlightExecutedElements = function (elementIds) {
        elementIds.forEach(function (elementId) {
            var element = elementRegistry.get(elementId);

            // skip elements that are not available in this diagram
            if (!element) {
                return;
            }

            if (element.type === 'bpmn:SequenceFlow') {
                var djsVisual = document.querySelectorAll('*[data-element-id=' + elementId + '] .djs-visual')[0]; // get the first (and only) element
                var arrow = djsVisual.firstChild;
                // clone the arrow and set another CSS style (no marker-end, wider stroke, less opacity, ...)
                var arrowClone = arrow.cloneNode(true);
                arrowClone.removeAttribute('style');
                arrowClone.setAttribute('class', MARKER_EXECUTED_ARROW);
                // append the highlight arrow
                djsVisual.appendChild(arrowClone);
            } else {
                // set the rounded corners directly on the SVG element since it can not be set via CSS
                var djsOutline = document.querySelectorAll('*[data-element-id=' + elementId + '] .djs-outline')[0]; // get the first (and only) element
                djsOutline.setAttribute('rx', '10px');
                djsOutline.setAttribute('ry', '10px');
                // add the marker
                canvas.addMarker(element, MARKER_EXECUTED_ELEMENT);
            }
        });
    }
}

IvyMarker.$inject = ['eventBus', 'canvas', 'elementRegistry'];

module.exports = IvyMarker;