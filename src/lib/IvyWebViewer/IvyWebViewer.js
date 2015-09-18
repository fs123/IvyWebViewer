'use strict';

var Viewer = require('../../../node_modules/bpmn-js/lib/Viewer');
var processLoader = require('../rest/IvyProcessLoader');

function IvyWebViewer(options) {
    Viewer.call(this, options);
    global.ivyviewer = this;
    this.loadedProcessPid = undefined;
}

IvyWebViewer.prototype = Object.create(Viewer.prototype);


IvyWebViewer.prototype.loadProcess = function(pid) {
    processLoader.loadProcess(pid);
};

module.exports = IvyWebViewer;

IvyWebViewer.prototype._ivyModules = [
    require('../feature/IvyRenderer'),
    require('../feature/IvyMarker'),
    require('../feature/IvyOverlays'),
    require('../feature/IvyProcess'),
    require('../feature/IvyNavigation'),
    require('../feature/IvyEvent')
];

IvyWebViewer.prototype._modules = [].concat(
    IvyWebViewer.prototype._modules,
    IvyWebViewer.prototype._ivyModules);