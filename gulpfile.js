var gulp = require('gulp');
var inject = require('gulp-inject');
var del = require('del');
var webserver = require('gulp-webserver');
var htmlclean = require('gulp-htmlclean');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpEjs = require('gulp-ejs-template');
var logger = require('gulp-logger');
var jshint = require('gulp-jshint');

var paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.css',
  srcJS: 'src/**/*.js',
  srcEJS: 'src/views/*',
  srcIMG: 'src/img/*',

  tmp: 'tmp',
  tmpIndex: 'tmp/index.html',
  tmpCSS: 'tmp/**/*.css',
  tmpJS: 'tmp/**/*.js',
  tmpEJS: 'tmp/views/',
  tmpIMG: 'tmp/img/',

  dist: 'dist',
  distIndex: 'dist/index.html',
  distCSS: 'dist/css/',
  distJS: 'dist/js/',
  distEJS: 'dist/views/',
  distIMG: 'dist/img/',
};

gulp.task('clean', function () {
  del([paths.tmp, paths.dist]);
});

gulp.task('jshint', function(){
  return gulp.src(paths.srcJS)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('html', function () {
  return gulp.src(paths.srcHTML)
    .pipe(gulp.dest(paths.tmp));
});
gulp.task('css', function () {
  return gulp.src(paths.srcCSS)
    .pipe(gulp.dest(paths.tmp));
});
gulp.task('js', function () {
  return gulp.src(paths.srcJS)
    .pipe(gulp.dest(paths.tmp));
});
gulp.task('img', function () {
  return gulp.src(paths.srcIMG)
    .pipe(gulp.dest(paths.tmpIMG));
});
gulp.task('ejs', function () {
  return gulp.src(paths.srcEJS)
    //.pipe(gulpEjs())
    .pipe(gulp.dest(paths.tmpEJS));
});

gulp.task('copy', ['jshint', 'html', 'css', 'js', 'img', 'ejs']);

gulp.task('inject', ['copy'], function () {
  var css = gulp.src(paths.tmpCSS);
  var js = gulp.src(paths.tmpJS);
  return gulp.src(paths.tmpIndex)
    .pipe(inject(css, { relative: true }))
    .pipe(inject(js, { relative: true }))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('serve', ['inject'], function () {
  return gulp.src(paths.tmp)
    .pipe(webserver({
      port: 3000,
      livereload: true
    }));
});

gulp.task('watch', ['serve'], function () {
  gulp.watch(paths.src, ['inject']);
});

gulp.task('default', ['watch']);

gulp.task('html:dist', function () {
  return gulp.src(paths.srcHTML)
    .pipe(gulp.dest(paths.dist));
});
gulp.task('css:dist', function () {
  return gulp.src(paths.srcCSS)
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.distCSS));
});
gulp.task('js:dist', function () {
  return gulp.src(paths.srcJS)
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.distJS));
});
gulp.task('img:dist', function () {
  return gulp.src(paths.srcIMG)
    .pipe(gulp.dest(paths.distIMG));
});
gulp.task('views:dist', function () {
  return gulp.src(paths.distVIEWS + '*')
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.distVIEWS + '*'));
});
gulp.task('ejs:dist', function () {
  return gulp.src(paths.srcEJS)
    //.pipe(gulpEjs())
    //.pipe(uglify())
    .pipe(gulp.dest(paths.distVIEWS));
});

gulp.task('copy:dist', ['html:dist', 'css:dist', 'js:dist', 'img:dist', 'views:dist']);

gulp.task('inject:dist', ['copy:dist'], function () {
  var css = gulp.src(paths.distCSS + "/*");
  var js = gulp.src(paths.distJS + "/*");
  return gulp.src(paths.distIndex)
    .pipe(inject(css, { relative: true }))
    .pipe(inject(js, { relative: true }))
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['inject:dist']);