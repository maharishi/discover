var gulp = require('gulp');
//var pug = require('gulp-pug');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
//var uglify = require('uglify-js');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function(){
  return gulp.src('content/css/*.css')
    .pipe(concat('app.min.css'))
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});

gulp.task('js', function(){
  return gulp.src('content/script/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
});

gulp.task('default', [ 'css' , 'js' ]);