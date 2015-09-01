'use strict';
var isFunction = require('lodash/lang/isFunction'),
    forEach = require('lodash/collection/forEach');

function IvyNavigation(contextPad, processLoader) {

    var createActionWithClickActionFactory = function (title, className, clickActionFactory) {
        return {
            group: 'tools',
            className: className || 'ivy-navigation-entry',
            title: title,
            action: {
                clickActionFactory: clickActionFactory
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

    var loadCallableProcessActionFactory = function(element) {
        var pid = element.businessObject.calledElement;
        return function() {
            loadProcess(pid);
        };
    };

    var loadCallingProcessActionFactory = function(element) {
        var pid = element.businessObject.id;
        return function() {
            loadProcess(pid);
        };
    };

    var handlers = {
        'bpmn:CallActivity': {
            openCallActivity: createActionWithClickActionFactory('Go to referenced process', 'glyphicon-eye-open', loadCallableProcessActionFactory)
        },
        'bpmn:StartEvent': {
            openCaller: createActionWithClickActionFactory('Go to referenced process', 'glyphicon-eye-open', loadCallingProcessActionFactory)
        }
    };


    var getEntries = function (element) {
        var entries = handlers[element.type];
        if (!entries) {
            return {};
        }

        forEach(entries, function(entry, key) {
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

IvyNavigation.$inject = ['contextPad', 'processLoader'];

module.exports = IvyNavigation;
