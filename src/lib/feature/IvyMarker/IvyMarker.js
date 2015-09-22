'use strict';

var MARKER_EXECUTED_ELEMENT = 'executed-element',
    MARKER_EXECUTED_ARROW = 'executed-arrow';

function IvyMarker(canvas, elementRegistry) {

    /**
     * Iterates the element id's and highlights each, which occurrs in the model.
     *
     * @param elementIds
     * @returns the element id's
     */
    var highlightElementsById = function (elementIds) {
        elementIds.forEach(highlightElementById);
        return elementIds;
    };

    /**
     * Iterates all elements and removes highlighting.
     */
    var unhighlightAll = function () {
        var allElements = elementRegistry.getAll();
        allElements.forEach(function(element) {
            if(element.type === 'bpmn:SequenceFlow') {
                unhighlightSequenceFlow(element);
            } else {
                unhighlightElement(element);
            }
        });
    };

    var highlightElementById = function (elementId) {
        var element = elementRegistry.get(elementId);
        if (!element) {
            throw new ReferenceError('Element with id [' + elementId + '] was not found in element registry.');
        }

        if (element.type === 'bpmn:SequenceFlow') {
            highlightSequenceFlow(element);
        } else {
            highlightElement(element);
        }
    };

    var highlightSequenceFlow = function (element) {
        var djsVisual = document.querySelectorAll('*[data-element-id=' + element.id + '] .djs-visual')[0]; // get the first (and only) element

        checkElementInDom(djsVisual, element.id);

        // abort in case that a highlighting sequence flow already exists
        if(djsVisual.childNodes[1]) {
            return;
        }

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

        checkElementInDom(djsOutline, element.id);

        djsOutline.setAttribute('rx', '10px');
        djsOutline.setAttribute('ry', '10px');

        // add the marker
        canvas.addMarker(element, MARKER_EXECUTED_ELEMENT);
    };

    var unhighlightSequenceFlow = function (element) {
        var djsVisual = document.querySelectorAll('*[data-element-id=' + element.id + '] .djs-visual')[0]; // get the first (and only) element

        checkElementInDom(djsVisual, element.id);

        var arrowClone = djsVisual.childNodes[1];
        if(arrowClone) {
            // do not remove node directly like this: arrowClone.remove();
            // --> PhantomJS does not support this, see https://github.com/ariya/phantomjs/issues/10970
            djsVisual.removeChild(arrowClone);
        }
    };

   var unhighlightElement = function (element) {
        var djsOutline = document.querySelectorAll('*[data-element-id=' + element.id + '] .djs-outline')[0]; // get the first (and only) element

       checkElementInDom(djsOutline, element.id);

        djsOutline.removeAttribute('rx');
        djsOutline.removeAttribute('ry');

        // add the marker
        canvas.removeMarker(element, MARKER_EXECUTED_ELEMENT);
    };

    function checkElementInDom(element, elementId) {
        if (typeof element === 'undefined') {
            throw new ReferenceError('Element with id [' + elementId + '] was not found in DOM.');
        }
    }

    this.highlightExecutedElements = highlightElementsById;
    this.unhighlightAllElements = unhighlightAll;
}

IvyMarker.$inject = ['canvas', 'elementRegistry'];

module.exports = IvyMarker;