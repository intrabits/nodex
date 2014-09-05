var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');
// var sourcemaps = require('gulp-sourcemaps');
// var del = require('del');


gulp.task('scripts', function() {
  gulp.src('./../public/scripts/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./../public/scripts/'))
});