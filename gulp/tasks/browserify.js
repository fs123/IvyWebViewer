'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
//var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

var config = require('../config');

var browserifyTask = function() {

    var b = browserify({
        entries: config.app.start,
        debug: true // include source maps.
    });
    b.transform('brfs');
    var bundle = function() {
        return b.bundle()
            .pipe(source('showcases.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            //.pipe(uglify())
            .on('error', gutil.log)
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.app.dist));
    };

    /*
    if(devMode) {
        // Wrap with watchify and rebundle on changes
        b = watchify(b);
        // Rebundle on update
        b.on('update', bundle);
        bundleLogger.watch(bundleConfig.outputName);
    }
    */

    return bundle();
}

gulp.task('browserify', function() {
    return browserifyTask()
});

module.exports = browserifyTask;