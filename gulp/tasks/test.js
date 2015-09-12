var gulp = require('gulp');
var Server = require('karma').Server;

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

gulp.task('karma:unit', function() {

});