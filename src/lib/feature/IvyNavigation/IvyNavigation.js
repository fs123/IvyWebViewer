'use strict';
var isFunction = require('lodash/lang/isFunction'),
    forEach = require('lodash/collection/forEach');

function IvyNavigation(contextPad, processLoader, popupMenu, canvas) {

    var createActionWithClickAction = function (title, className, clickAction) {
        return {
            group: 'tools',
            className: className || 'ivy-navigation-entry',
            title: title,
            action: {
                click: clickAction
            }
        };
    };

    var loadProcessCallback = function(err){
        if (err) {
            return console.error('could not load process', err);
        }
        var canvas = global.ivyviewer.instance.get('canvas');
        // zoom to fit full viewport
        canvas.zoom('fit-viewport');
    };

    var loadProcess = function(pid) {
        if (!pid) {
            console.error("INVALID PARAMETER PID: " + pid);
        }

        var process = processLoader.getProcess(pid);
        if (!process) {
            console.error("Could not find process with pid: " + pid);
        }

        global.ivyviewer.instance.importXML(process, loadProcessCallback);
    };

    var loadCallableProcessAction = function(event, element) {
        var pid = element.businessObject.calledElement;
        loadProcess(pid);
    };

    var findCallingProcessAction = function(event, element) {
        var pid = element.businessObject.id;

        var foundElements = processLoader.findCallersOfProcess(pid);
        var entries = [];
        forEach(foundElements, function(entry) {
            entries.push({
                label: entry.path + entry.name,
                className: '',
                id: entry.pid,
                action: function () {
                    loadProcess(entry.pid);
                }
            });
        });

        popupMenu.open({
            className: 'navigation-menu',
            element: element,
            position: getPopupMenuPosition(element),
            headerEntries: [],
            entries: entries
        });
    };

    var handlers = {
        'bpmn:CallActivity': {
            openCallActivity:
                createActionWithClickAction('Go to sub process', 'glyphicon-eye-open', loadCallableProcessAction)
        },
        'bpmn:StartEvent': {
            openCaller: createActionWithClickAction('Find calling processes', 'glyphicon-eye-open', findCallingProcessAction)
        }
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

    var getEntries = function (element) {
        var entries = handlers[element.type];
        if (!entries) {
            return {};
        }

        forEach(entries, function(entry) {
            if (isFunction(entry.action.clickActionFactory)) {
                entry.action.click = entry.action.clickActionFactory(element);
            }
        });

        return entries;
    };

    contextPad.registerProvider({
        getContextPadEntries: getEntries
    });
}

IvyNavigation.$inject = ['contextPad', 'processLoader', 'popupMenu', 'canvas'];

module.exports = IvyNavigation;
