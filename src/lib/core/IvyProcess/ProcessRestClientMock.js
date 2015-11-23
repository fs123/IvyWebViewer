'use strict';

var fs = require('fs');

function ProcessRestClientMock() {
    var BACK_REFERENCE = "14FDF5E0A9A44A7D-f0";
    var PID1 = "14FDF94A18479D58"; // CallIt.bpmn
    var PID2 = "14FDF5E0A9A44A7D"; // CallMe.bpmn

    // inlined in result file via brfs
    var callerProcess = fs.readFileSync(__dirname + '/../../../../resources/CallIt.bpmn', 'utf-8');
    var callableProcess = fs.readFileSync(__dirname + '/../../../../resources/CallMe.bpmn', 'utf-8');

    var resources = {};
    resources[PID1] = callerProcess;
    resources[PID2] = callableProcess;

    var _getProcess = function(pid, sucessCallback) {
        sucessCallback(resources[pid]);
    };

    var _findCallersOfProcess = function(pid, sucessCallback) {
        var data;
        if (pid !== BACK_REFERENCE) {
            data = [{
                name: "No caller process(es) found",
                pid: "UNDEFINED"
            }];
        } else {
            data =  [
                {
                    "qualifiedProcessName": "CallIt",
                    "processName": "CallIt",
                    "callerName": "CallMe",
                    "callerPid": "14FDF94A18479D58"
                }
            ];
        }
        sucessCallback(data);
    };

    var _getProcesses = function() {
        return [
            {
                path: "resources/CallIt.bpmn",
                namespace: "",
                name: "Call It",
                pid: PID1
            },
            {
                path: "resources/CallMe.bpmn",
                name: "Call Me",
                pid: PID2
            }
        ];
    };

    var _findProcessBySignature = function(signature, sucessCallback) {
        if (signature == "CallMe:call()") {
            var data = {
                "pid": "14FDF5E0A9A44A7D"
            };
            sucessCallback(data);
        }
    };

    return {
        getProcesses : _getProcesses,
        findCallersOfProcess: _findCallersOfProcess,
        findProcessBySignature: _findProcessBySignature,
        getProcess: _getProcess
    };
}

module.exports = ProcessRestClientMock();
