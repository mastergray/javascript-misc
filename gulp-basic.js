// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'); 	//	Used for linting
var sass = require('gulp-sass');		  // 	Compiles SASS
var concat = require('gulp-concat');	// 	Used for bundling
var uglify = require('gulp-uglify');  // 	Used for minifying
var rename = require('gulp-rename');	// 	Used to rename bundled file when being minifyed

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js') // checks any JavaScript file in our js/ directory and makes sure there are no syntax errors in our code
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss') // compiles any of our Sass files in our scss/ directory into .css and saves the compiled .css file in our css/ directory
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    
	return gulp.src('js/*.js')
        
		// concatenates all JavaScript files in our js/ directory and saves the ouput to our dist/ directory:
		.pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist'))
        
		//	takes that concatenated file, minifies it, renames it and saves it to the dist/ directory alongside the concatenated file:
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

/*

	The watch task is used to run tasks as we make changes to our files. As you write code and modify your files,
	the gulp.watch() method will listen for changes and automatically run our tasks again so we don't have to
	continuously jump back to our command-line and run the gulp command each time.

 */

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task -  This will be the task that is ran upon entering gulp into the command line without any additional parameters:
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);