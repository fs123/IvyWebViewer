'use strict';
/**
 * Firing Events:
 * - process.loading
 * - process.loaded
 * - process.loadFailed
 * @param restClient
 * @param eventBus
 * @constructor
 */

function IvyProcess(restClient, eventBus) {

    var loadProcess = function(pid) {
        if (!pid) {
            console.error("Invalid parameter pid: " + pid);
        }
        eventBus.fire('process.loading', {pid: pid});
        restClient.getProcess(pid,
                function (process){
                    global.ivyviewer.importXML(process, function(err){
                        var eventBus = global.ivyviewer.get('eventBus');
                        if (!err) {
                            eventBus.fire('process.loaded', {pid: pid});
                            var canvas = global.ivyviewer.get('canvas');
                            canvas.zoom('fit-viewport');
                        } else {
                            eventBus.fire('process.loadFailed', {pid: pid});
                        }
                    });
                }
            );
    };

    this.findCallersOfProcess = restClient.findCallersOfProcess;
    this.loadProcess = loadProcess;
}

IvyProcess.$inject = ['_restClient', 'eventBus'];

module.exports = IvyProcess;
