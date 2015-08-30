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

    initIvyMarker();
});

// IvyMarker: Highlight executed elements
var initIvyMarker = function() {
    // TODO: only used for the showcase, should be replaced with the REST API
    var executedElementIds = [
        'START', 'FLOW_START_TO_MERGE', 'MERGE', 'FLOW_MERGE_TO_SCAN', 'SCAN_QR_CODE', 'FLOW_SCAN_TO_SCAN_OK', 'SCAN_OK', 'FLOW_SCAN_OK_TO_MERGE'
    ];
    var ivyMarker = bpmnViewer.get('ivyMarker');

    document.getElementById('mark-executed-path-button').onclick = function() {
        ivyMarker.highlightExecutedElements(executedElementIds)
    };
    document.getElementById('reset-executed-path-button').onclick = function() {
        ivyMarker.unhighlightAllElements();
    }
}