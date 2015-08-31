module.exports = {
    __depends__: [
        require('bpmn-js/node_modules/diagram-js/lib/features/context-pad')
    ],
    __init__: [ 'ivyNavigation' ],
    ivyNavigation: [ 'type', require('./IvyNavigation') ]
};