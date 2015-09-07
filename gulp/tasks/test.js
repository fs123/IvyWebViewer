var gulp = require('gulp');
var Server = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/../../test/karma.conf.js',
        singleRun: true
    }, done).start();
});

//var Jasmine = require('jasmine');
//var jasmine = new Jasmine();
//var jasmine = require('gulp-jasmine-phantom');

//gulp.task('jasmine', function () {
//    jasmine.loadConfigFile('./test/spec/support/jasmine.json');
//    jasmine.onComplete(function (passed) {
//        if (passed) {
//            console.log('All specs have passed');
//        }
//        else {
//            console.log('At least one spec has failed');
//        }
//    });
//    jasmine.execute();
//});

//gulp.task('jasmine phantom', function() {
//    return gulp.src('./test/**/*[sS]pec.js')
//        .pipe(jasmine({
//            integration: true,
//            keepRunner: './'
//        }));
//});