var gulp = require('gulp'),
    Server = require('karma').Server,
    mocha = require('gulp-mocha');

/**
 * Run integration tests once and exit
 */
gulp.task('karma:integration', function (done) {
    new Server({
        configFile: __dirname + '/../../test/conf/karma.integration.conf.js',
        singleRun: true,
        autoWatch: false
    }, done).start();
});

/**
 * Run module tests once and exit
 */
gulp.task('karma:module', function (done) {
    new Server({
        configFile: __dirname + '/../../test/conf/karma.module.conf.js',
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