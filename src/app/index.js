'use strict';

var BpmnViewer = require('../lib/IvyWebViewer/IvyWebViewer.js');

var bpmnViewer = new BpmnViewer({
    container: '#viewer',
    width: '1000px',
    height: '700px'
});


console.log(bpmnViewer.loadProcess(window.location.hash.substr(1)));