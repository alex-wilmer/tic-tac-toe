var gulp = require('gulp')
  , babel = require('gulp-babel')
  , stylus = require('gulp-stylus')
  , nib = require('nib')
  , jade = require('gulp-jade')
  , react = require('gulp-react')

gulp.task('babel', function () {
  return gulp.src('src/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dest/js'))
})

gulp.task('stylus', function () {
  return gulp.src('src/styl/index.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(gulp.dest('dest/css'))
})

gulp.task('jade', function () {
  return gulp.src('src/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('dest'))
})

gulp.task('react', function () {
  return gulp.src('src/jsx/*.jsx')
    .pipe(babel())
    .pipe(gulp.dest('dest/jsx'))
})


gulp.task('watch', function () {
  gulp.watch('src/js/*.js', ['babel'])
  gulp.watch('src/styl/*.styl', ['stylus'])
  gulp.watch('src/*.jade', ['jade'])
  gulp.watch('src/jsx/*.jsx', ['react'])
})

gulp.task('default', ['watch', 'babel', 'stylus', 'jade', 'react'])
