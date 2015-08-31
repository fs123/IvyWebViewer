'use strict';

function IvyNavigation(contextPad) {

    var createAction = function (title, className, clickAction) {
        return {
            group: 'tools',
            className: className || 'ivy-navigation-entry',
            title: title,
            action: {
                click: clickAction
            }
        };
    };

    var handlers = {
        'bpmn:CallActivity': {
            openCallActivity: createAction('Go to referenced process', 'glyphicon-eye-open', function (event) {
                global.ivyviewer.instance.importXML(global.ivyviewer.file2,
                    function(err) {

                        if (err) {
                            return console.error('could not import BPMN 2.0 diagram', err);
                        }

                        var canvas = global.ivyviewer.instance.get('canvas');

                        // zoom to fit full viewport
                        canvas.zoom('fit-viewport');

                    });

            })
        },
        'bpmn:StartEvent': {
            openCaller: createAction('Go to referenced process', 'glyphicon-eye-open', function (event) {
                global.ivyviewer.instance.importXML(global.ivyviewer.file1,
                    function(err) {

                        if (err) {
                            return console.error('could not import BPMN 2.0 diagram', err);
                        }

                        var canvas = global.ivyviewer.instance.get('canvas');

                        // zoom to fit full viewport
                        canvas.zoom('fit-viewport');

                    });

            })
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

IvyNavigation.$inject = ['contextPad'];

module.exports = IvyNavigation;
