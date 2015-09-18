'use strict';

function ProcessRestClientDesigner(ivyRestClient) {

    var _getProcess = function(pid, sucessCallback, errorCallback) {
        ivyRestClient.get("designer/process/" + pid, {}, function (data, response) {
            if (response.statusCode === 200) {
                var xmlAsString = String.fromCharCode.apply(null, data);
                sucessCallback(xmlAsString, response);
            } else if (!!errorCallback) {
                errorCallback(data, response);
            }
        });
    };

    var _findCallersOfProcess = function(pid) {
        return [];
    };

    var _getProcesses = function() {
        return [];
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


ProcessRestClientDesigner.$inject = ['ivyRestClient'];

module.exports = ProcessRestClientDesigner;
