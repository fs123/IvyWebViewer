'use strict';

var Client = require('node-rest-client').Client;

function createRestClientUtils() {
    var createFullUrl = function(path){

        var options = {};

        if (!options.protocol) {
            options.protocol = window.location.protocol;
        }

        if (!options.host) {
            options.host = window.location.host;
        }

        if (!options.contextName) {
            var location = window.location.href;
            var hostEnd = location.indexOf('/', 7) + 1;
            var contextEnd = location.indexOf('/', hostEnd);
            options.contextName = location.substr(hostEnd, contextEnd - hostEnd) || 'ivy';
        }

        var ivyRoot = options.protocol + '//' + options.host +'/'+ options.contextName + '/api/' + path;
        return ivyRoot;
    };

    var restClient = {};
    var createFunction = function(method) {
        restClient[method] = function(url, args, callback) {
                var client = new Client();
                client[method](createFullUrl(url), args, callback);
            };
    };

    // create methods on rest client and forward them to the node-rest-client
    var methodToCreate = ['get', 'post', 'delete', 'put', 'patch'];
    for (var i = 0; i < methodToCreate.length; i++) {
        createFunction(methodToCreate[i]);
    }
    return restClient;
}

module.exports = createRestClientUtils();
