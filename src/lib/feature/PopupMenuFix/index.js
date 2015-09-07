module.exports = {
    /**
     * To use the PopupMenu a DI-Instance of 'modeling' is required. But
     * the module does nothing with the instance, so we just provide an emtpy object.
     * Otherwise the application does not start and fail with a fancy (DI) exception...
     */
    __init__: [ 'modeling' ],
    modeling: [ 'type', require('./empty') ]
};