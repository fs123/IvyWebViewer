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

});
