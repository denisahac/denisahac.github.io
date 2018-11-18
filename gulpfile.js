'use strict';

const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint')
const image = require('gulp-image');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

/**
 * Convert scss/.scss into css/.css files.
 */
gulp.task('sass', function() {
	var plugins = [
		autoprefixer({browsers: ['last 2 versions']}),
		cssnano()
	];

	return gulp.src('assets/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('assets/dist/css/'))
		.pipe(browserSync.stream());
});

/**
 * Javascript linter; i.e. error reporting for syntax error
 */
gulp.task('lint', function() {
	return gulp.src('assets/js/**/*.js')
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // .pipe(eslint.failAfterError());
});

/**
 * Transform Javascripts.
 */
gulp.task('js', function() {
	return gulp.src('assets/js/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('assets/dist/js/'))
});

 /**
 * Transform and bundle Javasdcripts into single file.
 */
gulp.task('concat', function() {
	return gulp.src([
			'assets/dist/js/app.js'
		])
		.pipe(babel())
		.pipe(concat('app.min.js'))
		.pipe(browserify())
		.pipe(uglify())
		.pipe(gulp.dest('assets/dist/js/'))
		.pipe(browserSync.stream());
});

/**
 * Minify images -- JPG, PNG, SVG
 */
gulp.task('image', function() {
	return gulp.src('assets/images/*/**')
		.pipe(image())
		.pipe(gulp.dest('assets/images/'));
});

/**
 * Setup static server and watch for css/html file changes.
 */
gulp.task('serve', function() {
	browserSync.init({
		server: "./"
	});

	// Watch for .scss file changes.
	gulp.watch('assets/scss/**/*.scss', ['sass']);

	// Watch for .js file changes
	gulp.watch('assets/js/**/*.js', ['lint', 'js', 'concat']);

	// Watch for .html file changes.
	gulp.watch('*.html').on('change', browserSync.reload);
});

/**
 * Configure default task.
 */
gulp.task('default', ['sass', 'lint', 'js', 'concat', 'serve']);
