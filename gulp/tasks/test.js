'use strict';

var gulp = require('gulp');
var karma = require('gulp-karma');
var $$ = require('gulp-load-plugins')({lazy: true});
var path = require('path');
var filter = require('gulp-filter');


gulp.task('test', function() {
    var testPath = path.resolve('./test/spec/**/*Spec.js');
    return gulp.src(testPath, {read: false})
        .pipe(karma({
            configFile: './test/config/karma.unit.js',
        }));
});