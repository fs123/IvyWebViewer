'use strict';

var fs = require('fs');
//var Client = require('node-rest-client').Client;
//var config = require('./RestClientConfig');


function RestClient() {
    var BACK_REFERENCE = "StartEvent_1";
    var PID2 = "MyCallableProcess_X";

    // inlined in result file via brfs
    var callerProcess = fs.readFileSync(__dirname + '/../../../../resources/complex.bpmn', 'utf-8');
    var callableProcess = fs.readFileSync(__dirname + '/../../../../resources/OpenProduct_Callable.bpmn', 'utf-8');

    var resources = {};
    resources[BACK_REFERENCE] = callerProcess;
    resources[PID2] = callableProcess;

    var _getProcess = function(pid, sucessCallback, errorCallback) {
        sucessCallback(resources[pid]);
        /*
        var client = new Client();
        var request = client.get(config.baseUrl + "process/", args, sucessCallback);

        if (errorCallback) {
            //request.on('error', errorCallback);
        }
        */
        //return resources[pid];
    };

    var _findCallersOfProcess = function(pid) {
        if (pid !== BACK_REFERENCE) {
            return [];
        }
        return [
            {
                path: "resources/complex.bpmn",
                namespace: "",
                name: "QR Code Scanner",
                pid: BACK_REFERENCE
            },
            {
                path: "resources/complex.bpmn",
                name: "Test QR Code Scanner",
                pid: BACK_REFERENCE
            }
        ];
    };

    var _getProcesses = function() {
        return [
            {
                path: "resources/complex.bpmn",
                namespace: "",
                name: "QR Code Scanner",
                pid: BACK_REFERENCE
            },
            {
                path: "resources/complex.bpmn",
                namespace: "",
                name: "Callable Process",
                pid: PID2
            }
        ];
    };

    return {
        getProcesses : _getProcesses,
        findCallersOfProcess: _findCallersOfProcess,
        getProcess: _getProcess
    };
}

module.exports = RestClient;
