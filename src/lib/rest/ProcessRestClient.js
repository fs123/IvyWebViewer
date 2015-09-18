'use strict';

//var clientMock = require('./ProcessRestClientMock');
var clientDesigner = require('./ProcessRestClientDesigner');

function createProcessRestClient() {

    //var client = ivyRestClient.testConnection() ? ivyRestClient : mock;
    var client = clientDesigner;

    return {
        getProcesses: client.getProcesses,
        findCallersOfProcess: client.findCallersOfProcess,
        getProcess: client.getProcess
    };
}

module.exports = createProcessRestClient();
