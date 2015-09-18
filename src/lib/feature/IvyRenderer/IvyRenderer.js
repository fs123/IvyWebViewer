'use strict';

var ModelUtil = require('../../core/ModelUtil');

function IvyRenderer(bpmnRenderer, ivyElements) {

    var decoratedDrawShape = bpmnRenderer.drawShape;

    function getIvyType(element) {
        if (element.type.substring(0, 5) !== 'bpmn:') {
            return null;
        }

        var value = ModelUtil.getExtensionValue(element, 'ivy:zClass');
        if (!value)
        {
            return null;
        }
        return 'ivy:' + value;
    }

    function getElementHandler(element) {
        var elementHandler = ivyElements.forType(element.type);
        if (elementHandler) {
            return elementHandler;
        }
        var ivyType = getIvyType(element);
        if (!ivyType)
        {
            return null;
        }
        elementHandler = ivyElements.forType(ivyType);
        if (elementHandler) {
            return elementHandler;
        }
        return null;
    }

    var decoratorDrawShape = function(parent, element) {
        var elementHandler = getElementHandler(element);
        if (elementHandler) {
            return elementHandler.draw(parent, element, decoratedDrawShape);
        } else {
            return decoratedDrawShape(parent, element);
        }
    };
    bpmnRenderer.drawShape = decoratorDrawShape;

}

IvyRenderer.$inject = ['renderer', 'ivyElements'];

module.exports = IvyRenderer;
