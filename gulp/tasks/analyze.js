'use strict';

var gutil = require('gulp-util');
var gulp = require('gulp');
var path = require('path');
var jshint = require('gulp-jshint');

var analyseTask = function() {

    var analyse = function() {
        var basePath = path.resolve('./src/');
        //util.log('Analyzing sources in ' + basePath);

        return gulp.src(
                [basePath + '/**/*.js', '!' + basePath + '/app/js/*.js'])
            .pipe(jshint({
                browser: true,
                node: true,
                strict: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                freeze: true}))
            .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
            .pipe(jshint.reporter('fail'));
    };

    return analyse();
}

gulp.task('analyse', function() {
    return analyseTask()
});

module.exports = analyseTask;