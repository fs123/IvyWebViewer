'use strict';

var getBBox = require('../../../../node_modules/bpmn-js/node_modules/diagram-js/lib/util/Elements').getBBox;

var createOverlayBuilder = function(overlays, elementRegistry) {

    var _elementId = "";
    var _text = "";
    var _type = "text";
    var _style = "info";
    var _position = "tr";

    var positionsText = {
        tr: {
            right: 10,
            top: -35
        },
        br: {
            right: 10,
            bottom: 10
        },
        bl: {
            bottom: 10,
            left: -140
        }
    };

    var positionsNumber = {
        tr: {
            right: 7,
            top: -17
        },
        br: {
            right: 7,
            bottom: 7
        },
        bl: {
            bottom: 7,
            left: -21
        },
        left: {
            top: -28,
            left: 3
        },
        center: {
            top: -28,
            center: -15
        },
        right: {
            top: -28,
            right: 33
        }
    };

    var positions = {
        number: positionsNumber,
        text: positionsText
    };

    var getPosition = function () {
        var position = positions[_type][_position];
        if (_position === 'center') {
            var element = elementRegistry.get(_elementId);
            var width;
            if (element.waypoints) {
                width = getBBox(element).width;
            } else {
                width = element.width;
            }

            position.left = position.center + (width/2);
        }

        return position;
    };

    return {
        forElement : function(elementId) {
            _elementId = elementId;
            return this;
        },

        withText : function(text) {
            _text = text;
            _type = "text";
            return this;
        },
        withNumber : function(number) {
            _text = number;
            _type = "number";
            return this;
        },

        asCustom : function(asStyle) {
            _style = asStyle;
            return this;
        },
        asInfo : function() {
            _style = "info";
            return this;
        },
        asSuccess : function() {
            _style = "success";
            return this;
        },
        asWarning : function() {
            _style = "warning";
            return this;
        },
        asDanger : function() {
            _style = "danger";
            return this;
        },

        onPosition : function(position) {
            _position = position;
            return this;
        },
        onTopRight : function() {
            _position = "tr";
            return this;
        },
        onBottomRight : function() {
            _position = "br";
            return this;
        },
        onBottomLeft : function() {
            _position = "bl";
            return this;
        },

        createAndAddOverlay : function () {
            var position = getPosition();
            return overlays.add(_elementId, _type, {
                position: position,
                html: '<div class="ivy-overlay ivy-overlay-' + _style + '">' + _text + '</div>'
            });
        }
    };

};


function IvyOverlays(overlays, elementRegistry) {

    var remove = function(id) {
        return overlays.remove(id);
    };

    var createBuilder = function() {
        return createOverlayBuilder(overlays, elementRegistry);
    };

    this.createOverlayBuilder = createBuilder;
    this.remove = remove;
}


IvyOverlays.$inject = [ 'overlays', 'elementRegistry'];

module.exports = IvyOverlays;