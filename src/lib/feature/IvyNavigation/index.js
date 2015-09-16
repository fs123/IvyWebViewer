module.exports = {
    __depends__: [
        //require('../PopupMenuFix'),
        require('bpmn-js/node_modules/diagram-js/lib/features/context-pad'),
        require('bpmn-js/node_modules/diagram-js/lib/features/popup-menu'),
        require('../IvyProcess')
    ],
    __init__: [ 'ivyNavigation' ],
    ivyNavigation: [ 'type', require('./IvyNavigation') ]
};