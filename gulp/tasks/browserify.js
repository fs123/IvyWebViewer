'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
//var uglify = require('gulp-uglify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

var config = require('../config');


var b = browserify({
    entries: config.app.start,
    debug: true // include source maps.
});
b.transform('brfs');

b = watchify(b);

var bundle = function() {
    return b.bundle()
        .pipe(source('ivyViewerApp.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.app.dist));
};

gulp.task('browserify', bundle);

b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

