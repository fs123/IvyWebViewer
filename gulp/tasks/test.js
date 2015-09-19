var gulp = require('gulp'),
    Server = require('karma').Server,
    mocha = require('gulp-mocha');

/**
 * Run test once and exit
 */
gulp.task('karma:single', function (done) {
    new Server({
        configFile: __dirname + '/../../test/karma.conf.js',
        singleRun: true,
        autoWatch: false
    }, done).start();
});

/**
 * This example shows, how to start server side mocha tests with gulp. No test runner (e.g. karma) is used.
 * But consider, that these tests are limited since they have no DOM; they do not run in context of a browser (not even headless)!
 *
 * The gulp-mocha plugin is required to start this task.
 */
gulp.task('mocha:unit', function () {
    return gulp.src('test/spec/appSpec.js')
        .pipe(mocha({
            reporter: 'spec'
        }));
});