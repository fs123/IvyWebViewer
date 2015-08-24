'use strict';

var OverlayBuilder = function(overlays) {

    var _elementId = "";
    var _text = "";
    var _type = "text";
    var _style = "info";
    var _position = "tr";

    var positions = {
        tr: {
            right: -5
        },
        br: {
            right: 0,
            bottom: -5
        },
        bl: {
            bottom: -5
        }
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
            return overlays.add(_elementId, _type, {
                position: positions[_position],
                html: '<div class="ivy-overlay ivy-overlay-' + _style + '">' + _text + '</div>'
            });
        }
    };

};


function IvyOverlays(overlays) {

    var remove = function(id) {
        return overlays.remove(id);
    };

    var createBuilder = function() {
        return new OverlayBuilder(overlays);
    };

    this.createOverlayBuilder = createBuilder;
    this.remove = remove;
}


IvyOverlays.$inject = [ 'overlays'];

module.exports = IvyOverlays;