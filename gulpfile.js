'use strict';

var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', {recurse: true});

// TODO make own task file
var gulp = require('gulp');
var Jasmine = require('jasmine');
var jasmine = new Jasmine();

gulp.task('test', function () {
    jasmine.loadConfigFile('./test/support/jasmine.json');
    jasmine.onComplete(function (passed) {
        if (passed) {
            console.log('All specs have passed');
        }
        else {
            console.log('At least one spec has failed');
        }
    });
    jasmine.execute();
});