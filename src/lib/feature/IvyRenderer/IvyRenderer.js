'use strict';

function IvyRenderer(bpmnRenderer, ivyElements) {

    var decoratedDrawShape = bpmnRenderer.drawShape;

    var decoratorDrawShape = function(parent, element) {
        var elementHandler = ivyElements.forType(element.type);
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
