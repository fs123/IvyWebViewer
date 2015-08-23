'use strict';

var MARKER_EXECUTED_ELEMENT = 'executed-element',
    MARKER_EXECUTED_ARROW = 'executed-arrow';

var executedElementIds = [
    'sid-D7F237E8-56D0-4283-A3CE-4F0EFE446138', // start
    'sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD', // arrow
    'sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9', // exclusive gateway
    'sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D', // arrow
    'sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26'  // task 'Scan QR code'
];

function IvyMarker(eventBus, canvas, elementRegistry) {

    eventBus.on('import.success', function (event) {
        // TODO: send request to REST API to get passed/highlighted elements
        highlightExecutedElements(executedElementIds);
    });

    function highlightExecutedElements(elementIds) {
        executedElementIds.forEach(function (elementId) {
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