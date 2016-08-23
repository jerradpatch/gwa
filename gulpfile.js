
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var imagemin = require('gulp-imagemin');

//var browserify = require('browserify');
var webpack = require("webpack");
var gutil = require("gutil");
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var connect = require('gulp-connect');

var paths = {
    scripts: 'app/app/**/*.js',
    index: 'app/index.html',
    entry: 'app/app/app.js',
    images: 'app/app/images/**/*',
    dist: 'dist'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del([paths.dist]);
});

gulp.task('scripts',['clean'], function() {
    // Minify and copy all JavaScript (except vendor app)
    // with sourcemaps all the way down
    return gulp.src(paths.scripts)
        //.pipe(sourcemaps.init())
        //.pipe(coffee())
        //.pipe(uglify())
        //.pipe(concat('all.min.js'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist));
});

gulp.task("build", ['clean'], function() {
    // run webpack
    webpack({
        entry: ['./'+paths.entry],
        output: {
        path: '/home/jerrad/pj/toolingtest2/dist/js',
        filename: "bundle.js"
        }
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
    });
});

// Copy all static images
gulp.task('images', ['clean'], function() {
    return gulp.src(paths.images)
    // Pass in options to the task
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(paths.dist));
});

// Rerun the task when a file changes
gulp.task('watch',['clean'], function() {
    gulp.watch(paths.scripts, ['scripts']);
    //gulp.watch(paths.images, ['images']);
});

gulp.task('webserver', function() {
    connect.server({
        livereload: false,
        directoryListing: true,
        root: paths.dist
    });
});

gulp.task('indexhtml',['clean'], function() {
    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('test',['clean'], function() {
    return gulp.src('node_modules/angular/angular.js')
        .pipe(gulp.dest(paths.dist));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'indexhtml', "build", 'webserver']);