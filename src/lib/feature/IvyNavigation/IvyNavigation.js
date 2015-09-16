'use strict';

var isFunction = require('lodash/lang/isFunction'),
    forEach = require('lodash/collection/forEach');

function IvyNavigation(contextPad, ivyProcess, popupMenu, canvas) {

    var loadProcess = function(pid) {
        ivyProcess.loadProcess(pid);
    };

    var loadCallableProcess = function(event, element) {
        var pid = element.businessObject.calledElement;
        loadProcess(pid);
    };

    var getProcessName = function (entry) {
        var label = '';
        if (entry.namespace) {
            label = entry.namespace + '.';
        }
        label += entry.name;
        return label;
    };

    var createPopupMenuEntries = function (foundElements) {
        var entries = [];
        forEach(foundElements, function(entry) {
            entries.push({
                label: getProcessName(entry),
                className: '',
                id: entry.pid,
                action: function () {
                    loadProcess(entry.pid);
                }
            });
        });
        return entries;
    };

    var showCallingProcess = function(event, element) {
        var pid = element.businessObject.id;
        var foundElements = ivyProcess.findCallersOfProcess(pid);
        var entries = createPopupMenuEntries(foundElements);

        popupMenu.open({
            className: 'navigation-menu',
            element: element,
            position: getPopupMenuPosition(element),
            headerEntries: [],
            entries: entries
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

        var pos = {
            x: left,
            y: top + padRect.height + Y_OFFSET
        };

        return pos;
    }

    var handlers = {
        'bpmn:CallActivity': {
            goToLinkedSubProcess: {
                group: 'tools',
                className: 'glyphicon-eye-open',
                title: 'Go to sub process',
                action: {
                    click: loadCallableProcess
                }
            }
        },
        'bpmn:StartEvent': {
            showCallingProcesses: {
                group: 'tools',
                className: 'glyphicon-eye-open',
                title: 'Find calling processes',
                action: {
                    click: showCallingProcess
                }
            }
        }
    };

    var getEntries = function (element) {
        var entries = handlers[element.type];
        if (!entries) {
            return {};
        }

        return entries;
    };

    contextPad.registerProvider({
        getContextPadEntries: getEntries
    });
}

IvyNavigation.$inject = ['contextPad', 'ivyProcess', 'popupMenu', 'canvas'];

module.exports = IvyNavigation;
