'use strict';

var Viewer = require('../../../node_modules/bpmn-js/lib/Viewer');

function IvyWebViewer(options) {
    Viewer.call(this, options);
    global.ivyviewer = this;
    this.loadedProcessPid = undefined;
}

IvyWebViewer.prototype = Object.create(Viewer.prototype);

module.exports = IvyWebViewer;

IvyWebViewer.prototype._ivyModules = [
    require('../feature/IvyRenderer'),
    require('../feature/IvyMarker'),
    require('../feature/IvyOverlays'),
    require('../feature/IvyProcess'),
    require('../feature/IvyNavigation')
];

IvyWebViewer.prototype._modules = [].concat(
    IvyWebViewer.prototype._modules,
    IvyWebViewer.prototype._ivyModules);