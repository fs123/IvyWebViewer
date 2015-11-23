'use strict';

var clientMock = require('./ProcessRestClientMock');
var clientDesigner = require('./ProcessRestClientDesigner');

function createProcessRestClient() {

    var client = (global.useMockService === true) ? clientMock : clientDesigner;

    return {
        getProcesses: client.getProcesses,
        findCallersOfProcess: client.findCallersOfProcess,
        findProcessBySignature: client.findProcessBySignature,
        getProcess: client.getProcess
    };
}

module.exports = createProcessRestClient();
