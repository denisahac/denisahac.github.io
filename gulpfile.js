'use strict';

const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const sass = require('gulp-sass');

/**
 * Convert scss/.scss into css/.css files.
 */
gulp.task('sass', function() {
	return gulp.src('assets/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('assets/css/')).
		pipe(browserSync.stream());
});

/**
 * Setup static server and watch for css/html file changes.
 */
gulp.task('serve', function() {
	browserSync.init({
		server: "./"
	});

	// Watch for .scss file changes.
	gulp.watch('assets/scss/*.scss', ['sass']);

	// Watch for .html file changes.
	gulp.watch('*.html').on('change', browserSync.reload);
});

/**
 * Configure default task.
 */
gulp.task('default', ['sass', 'serve']);
