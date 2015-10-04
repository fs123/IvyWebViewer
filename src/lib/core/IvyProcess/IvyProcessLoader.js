'use strict';

var processRestClient = require('./../IvyRestClient/ProcessRestClient');

function createIvyProcessLoader() {

    var loadProcess = function(pid) {
        if (!pid) {
            console.error("Invalid parameter pid: " + pid);
        }
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

    return {
        findCallersOfProcess: processRestClient.findCallersOfProcess,
        loadProcess: loadProcess
    };
}

module.exports = createIvyProcessLoader();
