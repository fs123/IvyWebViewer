'use strict';

var MARKER_EXECUTED_ELEMENT = 'executed-element',
    MARKER_EXECUTED_SEQUENCE = 'executed-sequence',
    MARKER_CURRENT_ELEMENT = 'current-element',
    MARKER_CURRENT_SEQUENCE = 'current-sequence',
    MARKER_ERROR_ELEMENT = 'error-element',
    MARKER_ERROR_SEQUENCE = 'error-sequence';

function IvyMarker(canvas, elementRegistry) {

    /**
     * Iterates the element id's and highlights each, which occurs in the model.
     *
     * @param elementIds
     * @returns the element id's
     * @private
     */
    var _highlightExecutedElements = function (elementIds) {
        elementIds.forEach(function(entry) {
            highlightElementById(entry, 'executed');
        });
        return elementIds;
    };

    /**
     * Highlights the element with the given id if it occurs in the model.
     *
     * @param elementId
     * @private
     */
    var _highlightCurrentElement = function(elementId) {
        highlightElementById(elementId, 'current');
        return elementId;
    };

    /**
     * Iterates the element id's and highlights each as error element, which occurs in the model.
     *
     * @param elementIds
     * @private
     */
    var _highlightErrorElements = function(elementIds) {
        elementIds.forEach(function(entry) {
            highlightElementById(entry, 'error');
        });
        return elementIds;
    };

    /**
     * Iterates all elements and removes highlighting.
     *
     * @private
     */
    var _unhighlightAllElements = function () {
        var allElements = elementRegistry.getAll();
        allElements.forEach(function(element) {
            if(element.type === 'bpmn:SequenceFlow') {
                unhighlightSequenceFlow(element);
            } else {
                unhighlightElement(element);
            }
        });
    };

    var highlightElementById = function (elementId, type) {
        var element = elementRegistry.get(elementId);
        if (!element) {
            throw new ReferenceError('Element with id [' + elementId + '] was not found in element registry.');
        }

        if (element.type === 'bpmn:SequenceFlow') {
            highlightSequenceFlow(element, type);
        } else {
            highlightElement(element, type);
        }
    };

    var highlightSequenceFlow = function (element, type) {
        var djsVisual = document.querySelectorAll('*[data-element-id=' + element.id + '] .djs-visual')[0]; // get the first (and only) element

        checkElementInDom(djsVisual, element.id);

        // abort in case that a highlighting sequence flow already exists
        if(djsVisual.childNodes[1]) {
            return;
        }

        var sequence = djsVisual.firstChild;
        // clone the sequence and set another CSS style (no marker-end, wider stroke, less opacity, ...)
        var sequenceClone = sequence.cloneNode(true);
        sequenceClone.removeAttribute('style');
        switch(type) {
            case 'executed':
                sequenceClone.setAttribute('class', MARKER_EXECUTED_SEQUENCE);
                break;
            case 'current':
                sequenceClone.setAttribute('class', MARKER_CURRENT_SEQUENCE);
                break;
            case 'error':
                sequenceClone.setAttribute('class', MARKER_ERROR_SEQUENCE);
                break;
            default:
                console.log('Invalid type for highlighting [' + type + '].');
                return;
        }

        // append the highlight sequence
        djsVisual.appendChild(sequenceClone);
    };

    var highlightElement = function (element, type) {
        // set the rounded corners directly on the SVG element since it can not be set via CSS
        var djsOutline = document.querySelectorAll('*[data-element-id=' + element.id + '] .djs-outline')[0]; // get the first (and only) element

        checkElementInDom(djsOutline, element.id);

        djsOutline.setAttribute('rx', '10px');
        djsOutline.setAttribute('ry', '10px');

        // add the marker
        switch(type) {
            case 'executed':
                canvas.addMarker(element, MARKER_EXECUTED_ELEMENT);
                break;
            case 'current':
                canvas.addMarker(element, MARKER_CURRENT_ELEMENT);
                break;
            case 'error':
                canvas.addMarker(element, MARKER_ERROR_ELEMENT);
                break;
            default:
                console.log('Invalid type for highlighting [' + type + '].');
                return;
        }
    };

    var unhighlightSequenceFlow = function (element) {
        var djsVisual = document.querySelectorAll('*[data-element-id=' + element.id + '] .djs-visual')[0]; // get the first (and only) element

        checkElementInDom(djsVisual, element.id);

        var sequenceClone = djsVisual.childNodes[1];
        if(sequenceClone) {
            // do not remove node directly like this: sequenceClone.remove();
            // --> PhantomJS does not support this, see https://github.com/ariya/phantomjs/issues/10970
            djsVisual.removeChild(sequenceClone);
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

    this.highlightExecutedElements = _highlightExecutedElements;
    this.highlightCurrentElement = _highlightCurrentElement;
    this.highlightErrorElements = _highlightErrorElements;
    this.unhighlightAllElements = _unhighlightAllElements;
}

IvyMarker.$inject = ['canvas', 'elementRegistry'];

module.exports = IvyMarker;