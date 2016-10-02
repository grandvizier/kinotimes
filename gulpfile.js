var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function () {
    return browserify({
        entries: "./app/main.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("app/dist"))
});

gulp.task("bundleProjectionist", ["bundle"], function () {
    return browserify({
        entries: "./app/projectionist/projectionist.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("projectionist.js"))
        .pipe(gulp.dest("app/dist/projectionist"))
});

gulp.task("copy", ["bundleProjectionist"], function () {
    return gulp.src(["app/index.html","app/lib/bootstrap-css/css/bootstrap.min.css","app/style.css"])
        .pipe(gulp.dest("app/dist"));
});

gulp.task("copyProjectionist", ["copy"], function () {
    return gulp.src(["app/projectionist/*"])
        .pipe(gulp.dest("app/dist/projectionist"));
});

gulp.task("default",["copyProjectionist"],function(){
   console.log("Gulp completed...");
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('app/**/*.js*', ['default']);
});