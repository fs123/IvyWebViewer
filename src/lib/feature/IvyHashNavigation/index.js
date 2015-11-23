module.exports = {
    __depends__: [
        require('../../core/IvyProcess')
    ],
    __init__: [ '_ivyHashNavigation' ],
    _ivyHashNavigation: [ 'type', require('./HashNavigation') ]
};