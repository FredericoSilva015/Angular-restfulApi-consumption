// Include gulp
var gulp = require('gulp'),
  merge2 = require('merge2'),
  jshint = require('gulp-jshint'),
  less = require('gulp-less'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  cleanCSS = require('gulp-clean-css'),
  rev = require('gulp-rev');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('js', function() {
  gulp.start('lint');
  // gulp.start('angular');
  return gulp.src([
      'node_modules/angular/angular.min.js',
      'node_modules/angular-resource/angular-resource.min.js',
      'assets/js/*.js'
    ])
    .pipe(concat('all.min.js'))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest('public/js'));
});

gulp.task('css', function() {
  return merge2(
      gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      ]),
      // better to put specifc styles after the general ones, this way they cascade and override, nonetheless its important to keep it has classes so they don't overlap with other properties
      gulp.src('assets/less/*.less')
      .pipe(less())
    )
    .pipe(concat('all.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', [
  'js',
  'css'
]);
