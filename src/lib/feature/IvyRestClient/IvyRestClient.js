'use strict';

var Client = require('node-rest-client').Client;

function RestClientUtils() {
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

        return options.protocol + '//' + options.host +'/'+ options.contextName + '/api/' + path;
    };

    var self = this;
    var createFunction = function(method) {
        self[method] = function(url, args, callback) {
                var client = new Client();
                client[method](createFullUrl(url), args, callback);
            };
    };

    var methodToCreate = ['get', 'post', 'delete', 'put', 'patch'];
    for (var i = 0; i < methodToCreate.length; i++) {
        createFunction(methodToCreate[i]);
    }
}

module.exports = RestClientUtils;

/*
 var createClient = function () {

 var options = RestConfig.args || {};

 if (!options.protocol) {
 options.protocol = window.location.protocol;
 }

 if (!options.host) {
 options.host = window.location.host;
 }

 if (!options.contextName) {
 var location = window.location.href;
 var hostEnd = location.indexOf('/');
 var contextEnd = location.indexOf('/', hostEnd);
 options.contextName = location.substr(hostEnd, contextEnd) || 'ivy';
 }

 var ivyRoot = options.protocol + '://' + options.host +'/'+ options.contextName + '/api';
 var args =
 {
 path: {
 ivy_root: ivyRoot
 }
 };

 return new Client(args);
 };
 */