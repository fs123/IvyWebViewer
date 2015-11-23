'use strict';

var restClient = require('./../IvyRestClient/RestClient');

function createProcessRestClientDesigner() {

    var _getProcess = function (pid, sucessCallback, errorCallback) {
        restClient.get("designer/process/" + pid, {}, function (data, response) {
            if (response.statusCode === 200) {
                var xmlAsString = String.fromCharCode.apply(null, data);
                sucessCallback(xmlAsString, response);
            } else if (!!errorCallback) {
                errorCallback(data, response);
            }
        });
    };

    var _findCallersOfProcess = function(pid, sucessCallback) {
        restClient.get("designer/process/services/findCallersOfProcess/" + pid, {}, function (data, response) {
            if (response.statusCode === 200) {
                sucessCallback(data, response);
            }
        });
    };

    var _findProcessBySignature = function(signature, sucessCallback) {
        restClient.get("designer/process/services/findProcessBySignature/" + signature, {}, function (data, response) {
            if (response.statusCode === 200) {
                sucessCallback(data, response);
            }
        });
    };


    var _getProcesses = function () {
        return [];
    };

    return {
        getProcesses : _getProcesses,
        findCallersOfProcess: _findCallersOfProcess,
        findProcessBySignature: _findProcessBySignature,
        getProcess: _getProcess
    };

}

module.exports = createProcessRestClientDesigner();
