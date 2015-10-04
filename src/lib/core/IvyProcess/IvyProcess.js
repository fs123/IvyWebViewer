'use strict';

/**
 * Firing Events:
 * - process.loading
 * - process.loaded
 * - process.loadFailed
 * @param processRestClient
 * @param eventBus
 * @constructor
 */
function IvyProcess(processRestClient, eventBus) {

    var loadProcess = function(pid) {
        if (!pid) {
            console.error("Invalid parameter pid: " + pid);
        }
        eventBus.fire('process.loading', {pid: pid});
        processRestClient.getProcess(pid,
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

    this.findCallersOfProcess = processRestClient.findCallersOfProcess;
    this.findProcessBySignature = processRestClient.findProcessBySignature;
    this.loadProcess = loadProcess;
}

IvyProcess.$inject = ['processRestClient', 'eventBus'];

module.exports = IvyProcess;