var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');

gulp.task('css', function(){
  return gulp.src('content/css/*.css')
    .pipe(concat('app.min.css'))
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});

gulp.task('jshint', function(){
  return gulp.src('content/script/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});

gulp.task('js', function(){
  return gulp.src('content/script/*.js')
    .pipe(concat('app.min.js'))  
    .pipe(sourcemaps.init({loadMaps: true}))
    //.pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
});

gulp.task('default', [ 'css' , 'jshint', 'js' ]);