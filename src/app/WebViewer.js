'use strict';

var fs = require('fs');
var BpmnViewer = require('../lib/IvyWebViewer/IvyWebViewer.js');
//var $ = require('jquery');

var bpmnViewer = new BpmnViewer({
    container: '#viewer'
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

    //alert(pathMap.pathMap['GATEWAY_EXCLUSIVE'].width);
    //alert(bpmnViewer.get('eventBus'));

    // zoom to fit full viewport
    canvas.zoom('fit-viewport');

    overlays.add('SCAN_OK', 'note', {
        position: {
            bottom: 0,
            right: 0
        },
        html: '<div class="diagram-note">Mixed up the labels?</div>'
    });


});

/*
module.exports.show = function() {
    var xml; // my BPMN 2.0 xml
    var viewer = new BpmnViewer({ container: '#viewer' });

    viewer.importXML(xml, function(err) {

        if (err) {
            console.log('error rendering', err);
        } else {
            console.log('rendered');
        }
    });
};

*/


