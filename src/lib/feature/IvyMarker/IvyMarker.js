'use strict';

var MARKER_EXECUTED_ELEMENT = 'executed-element',
    MARKER_EXECUTED_ARROW = 'executed-arrow';

function IvyMarker(canvas, elementRegistry) {

    //this._canvas = canvas;
    //this._elementRegistry = elementRegistry;

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

        checkElementInDom(djsVisual, element.id);

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
            arrowClone.remove();
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

        if (typeof element === 'undefined' || element.childNodes[1]) {
            throw new ReferenceError('Element with id [' + elementId + '] was not found in DOM.');
        }
    }


    this.highlightExecutedElements = highlightElementsById;
    this.unhighlightAllElements = unhighlightAll;
    this.getElementRegistry = function() { return elementRegistry; }; // TODO: just for testing, remove later!
}

IvyMarker.$inject = ['canvas', 'elementRegistry'];

module.exports = IvyMarker;