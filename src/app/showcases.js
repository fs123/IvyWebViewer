'use strict';

var fs = require('fs');
var BpmnViewer = require('../lib/IvyWebViewer/IvyWebViewer.js');
//var $ = require('jquery');

var bpmnViewer = new BpmnViewer({
    container: '#viewer',
    width: '1000px',
    height: '700px'
});


// inlined in result file via brfs
var qrDiagram = fs.readFileSync(__dirname + '/../../resources/complex.bpmn', 'utf-8');

bpmnViewer.importXML(qrDiagram, function(err) {

    if (err) {
        return console.error('could not import BPMN 2.0 diagram', err);
    }

    var canvas = bpmnViewer.get('canvas');
    var overlays = bpmnViewer.get('overlays');
    var pathMap = bpmnViewer.get('pathMap');

    // zoom to fit full viewport
    canvas.zoom('fit-viewport');

    initOverlays();
});


////// OVERLAYS ****************
var initOverlays = function() {
    var overlays = bpmnViewer.get('overlays');

    var noteManager = function() {
        var addedNote = null;
        var lastStyle = 'success';
        var lastPosition = 'tr';
        var lastType = 'text';

        var _addNote = function(type, position, style) {
            if (addedNote) {
                removeNote();
            }
            lastPosition = position;
            lastType = type;
            lastStyle = style;
            var ivyOverlays = bpmnViewer.get('ivyOverlays');
            var builder = ivyOverlays.createOverlayBuilder()
                .forElement('SCAN_QR_CODE');
            if (type === 'number') {
                builder.withNumber('213');
            } else {
                builder.withText('Reads in 99.8% <br/>the correct code.');
            }

            builder.asCustom(style);
            if (position === 'tr') {
                builder.onTopRight();
            } else if (position === 'bl') {
                builder.onBottomLeft();
            } else {
                builder.onBottomRight();
            }
            addedNote = builder.createAndAddOverlay();
        };

        var removeNote = function() {
            return function() {
                if (!addedNote) {
                    console.log('Note not found.');
                    return;
                }
                var ivyOverlays = bpmnViewer.get('ivyOverlays');
                ivyOverlays.remove(addedNote);
                addedNote = null;


                var canvas = bpmnViewer.get('canvas');
                canvas.zoom('fit-viewport');

            };
        }();

        return {
            remove: removeNote,
            showText : function (position) {
                _addNote('text', position, lastStyle);
            },
            showNumber : function (position) {
                _addNote('number', position, lastStyle);
            },
            showAs: function (style) {
                _addNote(lastType, lastPosition, style);
            }
        };

    }();

    document.getElementById('show-text-overlay-button').onclick = function() {noteManager.showText('tr');};
    document.getElementById('show-text-overlay-button-tr').onclick = function() {noteManager.showText('tr');};
    document.getElementById('show-text-overlay-button-br').onclick = function() {noteManager.showText('br');};
    document.getElementById('show-text-overlay-button-bl').onclick = function() {noteManager.showText('bl');};
    document.getElementById('reset-text-overlay-button').onclick = (noteManager.remove);

    document.getElementById('show-text-overlay-button-info').onclick = function() {noteManager.showAs('info');};
    document.getElementById('show-text-overlay-button-success').onclick = function() {noteManager.showAs('success');};
    document.getElementById('show-text-overlay-button-warning').onclick = function() {noteManager.showAs('warning');};
    document.getElementById('show-text-overlay-button-danger').onclick = function() {noteManager.showAs('danger');};

    document.getElementById('show-number-overlay-button').onclick = function() {noteManager.showNumber('tr');};
    document.getElementById('show-number-overlay-button-tr').onclick = function() {noteManager.showNumber('tr');};
    document.getElementById('show-number-overlay-button-br').onclick = function() {noteManager.showNumber('br');};
    document.getElementById('show-number-overlay-button-bl').onclick = function() {noteManager.showNumber('bl');};
    document.getElementById('reset-number-overlay-button').onclick = (noteManager.remove);

};