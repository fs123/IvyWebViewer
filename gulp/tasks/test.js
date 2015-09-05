var gulp = require('gulp');
var Jasmine = require('jasmine');
var jasmine = new Jasmine();

gulp.task('test', function () {
    jasmine.loadConfigFile('./test/spec/support/jasmine.json');
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