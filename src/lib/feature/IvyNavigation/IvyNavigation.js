'use strict';

var forEach = require('lodash/collection/forEach');

var ModelUtil = require('../../core/ModelUtil');

function IvyNavigation(contextPad, ivyProcess, popupMenu, canvas) {

    var loadProcess = function(pid) {
        ivyProcess.loadProcess(pid);
    };

    var loadCallableProcess = function(event, element) {
        var signature = ModelUtil.getExtensionValue(element, 'ivy:processCall');

        var pos = signature.lastIndexOf("/");
        if (pos > 0) {
            signature = signature.substring(pos+1);
        }

        ivyProcess.findProcessBySignature(signature, function(pidDesc){
            loadProcess(pidDesc.pid);
        });
    };

    var createPopupMenuEntries = function (foundElements) {
        var entries = [];
        forEach(foundElements, function(entry) {
            entries.push({
                label: entry.qualifiedProcessName,
                className: '',
                id: entry.callerPid,
                action: function () {
                    loadProcess(entry.callerPid);
                }
            });
        });
        return entries;
    };

    var showCallerProcess = function(event, element) {
        var pid = element.businessObject.$parent.$attrs['ivy:identifier'] + '-' + ModelUtil.getExtensionValue(element, 'ivy:identifier');
        ivyProcess.findCallersOfProcess(pid, function(foundElements){
            var entries = createPopupMenuEntries(foundElements);
            popupMenu.open({
                className: 'navigation-menu',
                element: element,
                position: getPopupMenuPosition(element),
                headerEntries: [],
                entries: entries
            });
        });
    };

    function getPopupMenuPosition (element) {

        var Y_OFFSET = 5;

        var diagramContainer = canvas.getContainer(),
            pad = contextPad.getPad(element).html;

        var diagramRect = diagramContainer.getBoundingClientRect(),
            padRect = pad.getBoundingClientRect();

        var top = padRect.top - diagramRect.top;
        var left = padRect.left - diagramRect.left;

        return {
            x: left,
            y: top + padRect.height + Y_OFFSET
        };
    }

    var handlers = {
        goToLinkedSubProcess: {
            group: 'tools',
            className: 'glyphicon-eye-open',
            title: 'Go to sub process',
            action: {
                click: loadCallableProcess
            }
        },
        showCallerProcesses: {
            group: 'tools',
            className: 'glyphicon-eye-open',
            title: 'Find calling processes',
            action: {
                click: showCallerProcess
            }
        }

    };

    var getEntries = function (element) {
        if (element.type === 'bpmn:CallActivity') {
            return [handlers.goToLinkedSubProcess];
        }
        var zClass = ModelUtil.getExtensionValue(element, 'ivy:zClass');
        if (zClass === 'StartSub') {
            return [handlers.showCallerProcesses];
        }
        return [];
    };

    contextPad.registerProvider({
        getContextPadEntries: getEntries
    });
}

IvyNavigation.$inject = ['contextPad', 'ivyProcess', 'popupMenu', 'canvas'];

module.exports = IvyNavigation;
