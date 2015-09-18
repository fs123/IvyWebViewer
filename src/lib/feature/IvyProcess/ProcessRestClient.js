'use strict';

var mock = require('./ProcessRestClientMock');

function ProcessRestClient(_restClientDesigner) {

    //var client = ivyRestClient.testConnection() ? ivyRestClient : mock;
    var client = _restClientDesigner;

    return {
        getProcesses : client.getProcesses,
        findCallersOfProcess: client.findCallersOfProcess,
        findProcessBySignature: client.findProcessBySignature,
        getProcess: client.getProcess
    };
}

module.exports = ProcessRestClient;
