// DEPENDENCIES
var gulp = require('gulp'),
  merge2 = require('merge2'),
  jshint = require('gulp-jshint'),
  less = require('gulp-less'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  rev = require('gulp-rev-append'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps');
// -/-

//TASKS

// Lint Task
gulp.task('lint', function() {
  return gulp.src('assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('js',['lint'], function() {
  // gulp.start('lint'); another way to call a task, but not good pactice in my opinion, use bracket one
  return gulp.src([
      //add by priority, angular depends of jquery, so jquery comes first, cascading style
      'node_modules/jquery/dist/jquery.slim.min.js',
      'node_modules/angular/angular.min.js',
      'node_modules/angular-resource/angular-resource.min.js',
      'assets/js/*.js'
    ])
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(concat('all.min.js'))
    .pipe(uglify({
      mangle: false
    }))
    // .pipe(rev())
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest('public/js'));
    // .pipe(rev.manifest('public/rev-manifest.json',{merge:true}))
    // .pipe(gulp.dest(''));
});

gulp.task('css', function() {
  return merge2(
      gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      ]),
      // ATTENTION
      // better to put specifc styles after the general ones, this way they cascade and override, nonetheless its important to keep it has classes so they don't overlap with other properties
      gulp.src('assets/less/*.less')
      .pipe(less())
    )
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(concat('all.min.css'))
    .pipe(cleanCSS())
    // .pipe(rev())
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest('public/css'));
    // .pipe(rev.manifest('public/rev-manifest.json',{merge:true}))
    // .pipe(gulp.dest(''));
});

// these simply destroy the files generated previously, no need for these keeping for possible use in the future
gulp.task('clean-js', function() {
  return del([
    'public/js/*.js'
  ]);
});
gulp.task('clean-css', function() {
  return del([
    'public/css/*.css'
  ]);
});



// cache busting only starts when 'js' and 'css' tasks are finished, so if they havent started it inheritly calls them
gulp.task('cache-bust',['js','css'], function() {
  gulp.src('index.html')
    .pipe(rev())
    .pipe(gulp.dest('.'));
});
// -/-

// GULP COMMANDS

// default for command 'gulp'
gulp.task('default', ['cache-bust']);

// watcher for command 'gulp watch'
gulp.task('watch', function() {
 gulp.watch('assets/js/**/*.js', ['cache-bust']);
 gulp.watch('assets/less/**/*.less', ['cache-bust']);
});
// -/-
