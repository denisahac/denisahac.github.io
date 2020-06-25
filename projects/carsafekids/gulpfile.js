'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var eslint = require('gulp-eslint')
var browerify = require('gulp-browserify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var image = require('gulp-image');


/**
 * SCSS to CSS task.
 */
gulp.task('sass', function() {
	var plugins = [
		autoprefixer({browsers: ['last 2 versions']}),
		cssnano()
	];

	return gulp.src('assets/scss/**/*.scss')
		.pipe(sass({
			includePaths: [
				'node_modules/foundation-sites/scss/',
				'node_modules/owl.carousel/src/scss/',
        'node_modules/hamburgers/_sass/hamburgers/'
			]
		}).on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(gulp.dest('assets/dist/css/'))
		.pipe(browserSync.stream());
});

/**
 * Transform Javascripts.
 */
gulp.task('js', function() {
	return gulp.src('assets/js/*.js')
		.pipe(babel())
		.pipe(browerify())
		.pipe(gulp.dest('assets/dist/js/'))
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
    // lint error, return the stream and pipe to failAfterError last.
    // .pipe(eslint.failAfterError());
});

/**
 * Watch for file changes, then perform the desired tasks.
 */
gulp.task('watch', function() {
	gulp.watch('assets/scss/**/*.scss', ['sass']);
	gulp.watch('assets/js/**/*.js', ['lint', 'js']);
	gulp.watch('assets/dist/css/**/*.css').on('change', browserSync.reload);
	gulp.watch('**/*.html', function() {
		browserSync.reload();
	});
	gulp.watch('**/*.php', function() {
		browserSync.reload();
	});
	gulp.watch('gulpfile.js', function() {
		browserSync.reload();
	});
});

/**
 * Live reload on file changes.
 */
gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: 'http://localhost/carsafekids'
	});
});

/**
 * Bundle Javasdcripts into single file.
 */
gulp.task('concat', function() {
	return gulp.src([
			'node_modules/jquery/dist/jquery.js',
			'node_modules/foundation-sites/dist/js/plugins/foundation.core.js',
			'node_modules/foundation-sites/dist/js/plugins/foundation.util.mediaQuery.js',
			'node_modules/foundation-sites/dist/js/plugins/foundation.util.keyboard.js',
			'node_modules/foundation-sites/dist/js/plugins/foundation.util.box.js',
			'node_modules/foundation-sites/dist/js/plugins/foundation.util.nest.js',
			'node_modules/foundation-sites/dist/js/plugins/foundation.util.triggers.js',
			'node_modules/foundation-sites/dist/js/plugins/foundation.util.motion.js',
			'node_modules/foundation-sites/dist/js/plugins/foundation.util.imageLoader.js',
			'node_modules/foundation-sites/dist/js/plugins/foundation.offcanvas.js',
			'node_modules/foundation-sites/dist/js/plugins/foundation.toggler.js',
      'node_modules/foundation-sites/dist/js/plugins/foundation.equalizer.js',
			'node_modules/owl.carousel/dist/owl.carousel.js',
			'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
			'node_modules/wowjs/dist/wow.js',
			'node_modules/fontfaceobserver/fontfaceobserver.js',
			'assets/dist/js/app.js'
		])
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/dist/js/'))
});


/**
 * Minify images -- JPG, PNG, SVG
 */
gulp.task('image', function() {
	return gulp.src('assets/images/*/**')
		.pipe(image())
		.pipe(gulp.dest('assets/images/'));
});

gulp.task('build', ['sass', 'lint', 'js', 'concat', 'image']); // Generate production ready assets.
gulp.task('default', ['sass', 'lint', 'js', 'watch', 'browser-sync']); 
