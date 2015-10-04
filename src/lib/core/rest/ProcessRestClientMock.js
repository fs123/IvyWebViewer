
'use strict';

var fs = require('fs');

function ProcessRestClientMock() {
    var BACK_REFERENCE = "StartEvent_1";
    var PID1 = "EAE484DC4A04";
    var PID2 = "MyCallableProcess_X";
    var PID3 = "14FDA2E529E727AC";

    // inlined in result file via brfs
    var callerProcess = fs.readFileSync(__dirname + '/../../../resources/complex.bpmn', 'utf-8');
    var callableProcess = fs.readFileSync(__dirname + '/../../../resources/OpenProduct_Callable.bpmn', 'utf-8');
    var simpleProcess = fs.readFileSync(__dirname + '/../../../resources/simple.bpmn', 'utf-8');

    var resources = {};
    resources[PID1] = callerProcess;
    resources[PID2] = callableProcess;
    resources[PID3] = simpleProcess;

    var _getProcess = function(pid, sucessCallback, errorCallback) {
        sucessCallback(resources[pid]);
    };

    var _findCallersOfProcess = function(pid) {
        if (pid !== BACK_REFERENCE) {
            return [{
                name: "No caller process(es) found",
                pid: "UNDEFINED"
            }];
        }
        return [
            {
                path: "resources/complex.bpmn",
                namespace: "",
                name: "QR Code Scanner",
                pid: PID1
            },
            {
                path: "resources/complex.bpmn",
                name: "Test QR Code Scanner",
                pid: PID1
            }
        ];
    };

    var _getProcesses = function() {
        return [
            {
                path: "resources/complex.bpmn",
                namespace: "",
                name: "QR Code Scanner",
                pid: PID1
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
        getProcess: _getProcess,
        testConnection: function() {
            return true;
        }
    };
}

module.exports = ProcessRestClientMock;
