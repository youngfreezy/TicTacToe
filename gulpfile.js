
var gulp = require('gulp');                            
var compass = require('gulp-compass');                 
var uglify = require('gulp-uglify');                   
var jshint = require('gulp-jshint');                   
var rename = require("gulp-rename");                   
var concat = require('gulp-concat');                   
var notify = require('gulp-notify');                   
var plumber = require('gulp-plumber');                 
var stylish = require('jshint-stylish');               
var minifycss = require('gulp-minify-css');            
var browserSync = require('browser-sync').create();    
var autoprefixer = require('gulp-autoprefixer');        
var nodemon = require('gulp-nodemon');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var port = process.env.PORT || 3000;


var target = {
    sass_src : 'css/scss/**/*.scss',                        // all sass files
    css_dest : 'public/css',                                // where to put minified css
    css_output : 'public/css/*.css',                                // where to put minified css
    sass_folder : 'css/scss',                                // where to put minified css
    js_concat_src : [                                   // all js files that should be concatinated
        'src/utils.js',
        'src/store.js',
        'src/winner-service.js',
        'src/score-view.js',
        'src/grid-view.js',
        'src/fiveicon-view.js',
        'src/game.js',
        'src/initializer.js'
    ],
    js_dest : 'public/js',                                  // where to put minified js
    css_img : 'public/css/i'
};


gulp.task('compass', function() {
    gulp.src(target.sass_src)
        .pipe(plumber())
        .pipe(compass({
            css: target.css_dest,
            sass: target.sass_folder,
            image: target.css_img
        }))
        .pipe(autoprefixer(
            'last 2 version',
            '> 1%',
            'ios 6',
            'android 4'
        ))
        .pipe(minifycss())
        .pipe(gulp.dest(target.css_dest));
});



gulp.task('js-lint', function() {
    gulp.src(target.js_concat_src)                        // get the files
        .pipe(jshint())                                 // lint the files
        .pipe(jshint.reporter(stylish))                 // present the results in a beautiful way
});


gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'http://localhost:' + port,
        files: ['public/**/*.*'],
        port: 5000
    });
});

gulp.task('nodemon', function(cb) {
    return nodemon({
      script: 'index.js'
    }).once('start', cb);
});

gulp.task('webpack', function() {
  return gulp.src(target.js_concat_src)
    .pipe(webpackStream({
        output: {
            filename: 'app.js'
        }
    }))
    .pipe(gulp.dest(target.js_dest));
});


gulp.task('default', ['compass', 'js-lint', 'webpack', 'nodemon']);
