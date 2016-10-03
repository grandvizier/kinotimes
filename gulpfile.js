var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function () {
    browserify({
        entries: "./app/main.jsx",
        ignoreMissing: true,
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("app/dist"))
    browserify({
        entries: "./app/projectionist/projectionist.jsx",
        ignoreMissing: true,
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("projectionist.js"))
        .pipe(gulp.dest("app/dist/projectionist"))
});

gulp.task("copy", ["bundle"], function () {
    gulp.src(["app/index.html","app/lib/bootstrap-css/css/bootstrap.min.css","app/style.css"])
        .pipe(gulp.dest("app/dist"));
    gulp.src(["app/projectionist/*"])
        .pipe(gulp.dest("app/dist/projectionist"));
});

gulp.task("default",["copy"],function(){
   console.log("Gulp completed...");
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('app/**/*.js*', ['default']);
});