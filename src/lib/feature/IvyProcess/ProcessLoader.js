'use strict';

var fs = require('fs');

function ProcessLoader() {
    var BACK_REFERENCE = "StartEvent_1";
    var PID2 = "MyCallableProcess_X";

    // inlined in result file via brfs
    var callerProcess = fs.readFileSync(__dirname + '/../../../../resources/complex.bpmn', 'utf-8');
    var callableProcess = fs.readFileSync(__dirname + '/../../../../resources/OpenProduct_Callable.bpmn', 'utf-8');

    var resources = {};
    resources[BACK_REFERENCE] = callerProcess;
    resources[PID2] = callableProcess;

    var _getProcess = function(pid) {
        return resources[pid];
    };

    var _findCallersOfProcess = function(pid) {
        return [
            {
                path: "/",
                name: "QR Code Scanner",
                pid: BACK_REFERENCE
            },
            {
                path: "/",
                name: "Test QR Code Scanner",
                pid: BACK_REFERENCE
            }
        ];
    };

    var _getProcesses = function() {
        return [
            {
                path: "/",
                name: "QR Code Scanner",
                pid: BACK_REFERENCE
            },
            {
                path: "/",
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

module.exports = ProcessLoader;
