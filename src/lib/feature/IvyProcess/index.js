module.exports = {
    __depends__: [
        require('../IvyRestClient')
    ],
    __init__: [ '_ivyHashNavigation' ],
    _restClient: [ 'type', require('./ProcessRestClient') ],
    _restClientDesigner: [ 'type', require('./ProcessRestClientDesigner') ],
    ivyProcess: [ 'type', require('./IvyProcess') ],
    _ivyHashNavigation: [ 'type', require('./HashNavigation') ]
};