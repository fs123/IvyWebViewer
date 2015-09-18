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
var callerDiagram = fs.readFileSync(__dirname + '/../../resources/complex.bpmn', 'utf-8');

bpmnViewer.importXML(callerDiagram, function(err) {

    if (err) {
        return console.error('could not import BPMN 2.0 diagram', err);
    }

    var canvas = bpmnViewer.get('canvas');
    var overlays = bpmnViewer.get('overlays');
    var pathMap = bpmnViewer.get('pathMap');


    // zoom to fit full viewport
    canvas.zoom('fit-viewport');

    initIvyMarker();
    initOverlays();
});

// IvyMarker: Highlight executed elements
var initIvyMarker = function() {
        // TODO: only used for the showcase, should be replaced with the REST API
        var executedElementIds = [
            'START', 'FLOW_START_TO_MERGE', 'MERGE', 'FLOW_MERGE_TO_SCAN', 'SCAN_QR_CODE', 'FLOW_SCAN_TO_SCAN_OK', 'SCAN_OK', 'FLOW_SCAN_OK_TO_MERGE'
        ];
        var ivyMarker = bpmnViewer.get('ivyMarker');

        document.getElementById('mark-executed-path-button').onclick = function() {
            ivyMarker.highlightExecutedElements(executedElementIds);
        };
        document.getElementById('reset-executed-path-button').onclick = function() {
            ivyMarker.unhighlightAllElements();
        };
    };


////// OVERLAYS ****************
var initOverlays = function() {
    var overlays = bpmnViewer.get('overlays');

    var noteManager = function() {
        var addedNote = null;
        var lastStyle = 'success';
        var lastPosition = 'tr';
        var lastType = 'text';
        var lastElement = 'FLOW_SCAN_OK_TO_OPEN_PRODUCT';
        var _addNote = function(type, position, style, element) {
            if (addedNote) {
                removeNote();
            }
            lastPosition = position;
            lastType = type;
            lastStyle = style;
            if (element === undefined) {
                element = 'SCAN_QR_CODE';
            }
            lastElement = element;
            var ivyOverlays = bpmnViewer.get('ivyOverlays');
            var builder = ivyOverlays.createOverlayBuilder()
                .forElement(element);
            if (type === 'number') {
                builder.withNumber('213');
            } else {
                builder.withText('Reads in 99.8% the correct code.');
            }

            builder.asCustom(style);
            builder.onPosition(position);

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
            showText : function (position, element) {
                _addNote('text', position, lastStyle, element);
            },
            showNumber : function (position, element) {
                _addNote('number', position, lastStyle, element);
            },
            showAs: function (style) {
                _addNote(lastType, lastPosition, style, lastElement);
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


    document.getElementById('show-arrow-number-overlay-button-left').onclick = function() {noteManager.showNumber('left', 'FLOW_MERGE_TO_SCAN');};
    document.getElementById('show-arrow-number-overlay-button-center').onclick = function() {noteManager.showNumber('center', 'FLOW_MERGE_TO_SCAN');};
    document.getElementById('show-arrow-number-overlay-button-right').onclick = function() {noteManager.showNumber('right', 'FLOW_MERGE_TO_SCAN');};

};