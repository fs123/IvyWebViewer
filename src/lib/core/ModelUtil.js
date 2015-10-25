'use strict';

var ModelUtil = {};

ModelUtil.getExtensionValue = function (element, type) {
    if (!element.businessObject.extensionElements) {
        return null;
    }

    var values = element.businessObject.extensionElements.values;
    var i = 0;
    for (; i < values.length; i++) {
        if (values[i].$type === type) {
            return values[i].$body;
        }
    }

    return null;
};

module.exports = ModelUtil;