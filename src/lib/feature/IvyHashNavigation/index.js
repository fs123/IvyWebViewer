module.exports = {
    __depends__: [
        require('../../core/IvyRestClient')
    ],
    __init__: [ '_ivyHashNavigation' ],
    _ivyHashNavigation: [ 'type', require('./HashNavigation') ]
};