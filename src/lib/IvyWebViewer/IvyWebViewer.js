'use strict';

var Viewer = require('../../../node_modules/bpmn-js/lib/Viewer');

function IvyWebViewer(options) {
    Viewer.call(this, options);
}

IvyWebViewer.prototype = Object.create(Viewer.prototype);

module.exports = IvyWebViewer;

IvyWebViewer.prototype._ivyModules = [
    require('../feature/IvyMarker'),
    require('../feature/IvyRenderer')
];

IvyWebViewer.prototype._modules = [].concat(
    IvyWebViewer.prototype._modules,
    IvyWebViewer.prototype._ivyModules);