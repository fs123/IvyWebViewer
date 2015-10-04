module.exports = {
    __depends__: [
        require('../IvyRestClient')
    ],
    __init__: [ '_ivyHashNavigation' ],
    ivyProcess: [ 'type', require('./IvyProcess') ],
    _ivyHashNavigation: [ 'type', require('./HashNavigation') ]
};