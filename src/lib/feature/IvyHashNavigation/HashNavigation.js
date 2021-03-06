'use strict';

function HashNavigation(ivyProcess, eventBus) {

    var getPidFromUrl = function (hash) {
        var pidSeparator = hash.indexOf('-');
        if (!pidSeparator || pidSeparator <= 1) {
            pidSeparator = hash.length;
        }
        return hash.substr(1, pidSeparator-1);
    };

    var onHashChange = function () {
        if (location.hash.length === 0) {
            return;
        }

        var pid = getPidFromUrl(location.hash);
        if (!pid) {
            return;
        }

        if (global.ivyviewer.loadedProcessPid === pid) {
            return;
        }

        ivyProcess.loadProcess(pid);
    };

    function resetHash() {
        updateHash({pid: global.ivyviewer.loadedProcessPid});
    }

    var updateHash = function (event) {
        if (!event.pid) {
            return;
        }
        global.ivyviewer.loadedProcessPid = event.pid;
        if (getPidFromUrl(location.hash) === event.pid) {
            return;
        }
        location.hash = '#' + event.pid;
    };

    eventBus.on('process.loaded', updateHash);
    eventBus.on('process.loadFailed', resetHash);
    window.onhashchange = onHashChange;
}

HashNavigation.$inject = ['ivyProcess', 'eventBus'];

module.exports = HashNavigation;