var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');

var sass = require('gulp-sass');


var paths = {

	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],

	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	},

	'scripts': {
		all: [
			'./node_modules/underscore/underscore,js',
			'./node_modules/jquery/dist/jquery.js',
			'./scripts/main.js'
		],
		output: './public/scripts/'
	}
};

// gulp lint
gulp.task('lint', function(){

	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', function () {

	gulp.watch(paths.src, ['lint']);
});


gulp.task('watch:sass', function () {

	gulp.watch(paths.style.all, ['sass']);
});


gulp.task('sass', function(){

	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.style.output));
});


gulp.task('watch:scripts', function () {

	gulp.watch(paths.scripts.all, ['scripts']);
});


gulp.task('scripts', function(){

	gulp.src(paths.scripts.all)
		.pipe(plumber())
		.pipe(concat('bundle.js'))
		// .pipe(jshint())
  // 		.pipe(jshint.reporter(jshintReporter))
  		.pipe(uglify())
  		.pipe(gulp.dest(paths.scripts.output));
});


gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [
	'sass',
	'watch:sass',
	'scripts',
	'watch:scripts',
	'watch:lint'
]);


gulp.task('default', ['watch', 'runKeystone']);
