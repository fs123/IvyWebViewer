'use strict';

var gulp = require('gulp');
var path = require('path');
var jshint = require('gulp-jshint');

var analyseTask = function() {

    var analyse = function() {
        var srcPath = path.resolve('./src/');
        var testPath = path.resolve('./test/');
        //util.log('Analyzing sources in ' + basePath);

        return gulp.src(
                [srcPath + '/**/*.js', '!' + srcPath + '/app/js/*.js',
                 testPath + '/**/*.js'])
            .pipe(jshint({
                browser: true,
                node: true,
                strict: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                freeze: true,
                expr: true
            }))
            .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
            .pipe(jshint.reporter('fail'));
    };

    return analyse();
};

gulp.task('analyse', function() {
    return analyseTask()
});

module.exports = analyseTask;