'use strict';

function IvyProcess(restClient) {

    var loadProcessCallback = function(err){
        if (err) {
            return console.error('could not load process', err);
        }
        var canvas = global.ivyviewer.instance.get('canvas');
        // zoom to fit full viewport
        canvas.zoom('fit-viewport');
    };

    var _loadProcess = function(pid) {
        if (!pid) {
            console.error("Invalid parameter pid: " + pid);
        }

        restClient.getProcess(pid,
                function(process){
                    global.ivyviewer.instance.importXML(process, loadProcessCallback);
                },
                function(error){
                    console.error("Could not find process with pid: " + pid + " - " + error);
                }
            );
    };

    this.findCallersOfProcess = restClient.findCallersOfProcess;
    this.loadProcess = _loadProcess;
}



IvyProcess.$inject = ['restClient'];

module.exports = IvyProcess;
