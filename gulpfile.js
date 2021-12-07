const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'));
const rimraf = require('rimraf');

/* ----------------------- Server ----------------------- */
gulp.task('server', function () {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }

    });
    gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* ----------------------- Pug compile ----------------------- */
gulp.task('html-compile', function buildHTML() {
    return gulp.src('source/template/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'));
});

/* ----------------------- Styles compile ----------------------- */
gulp.task('css-compile', function () {
    return gulp.src('source/styles/style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('build/css/style.css'))
});

/* ----------------------- Styles compile ----------------------- */
gulp.task('clean', function del(){
    return rimraf
})

/* ----------------------- Copy fonts ----------------------- */
gulp.task('copy:fonts', function (){
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'))
});

/* ----------------------- Copy images ----------------------- */
gulp.task('copy:fonts', function (){
    return gulp.src('./source/images/**/*.*')
        .pipe(gulp.dest('build/images'))
});

/* ----------------------- Copy ----------------------- */
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

/* ----------------------- Watchers ----------------------- */
gulp.task('watch', function (){
    gulp.watch('source/template/**/*.pug', gulp.series('html-compile'));
    gulp.watch('source/styles/**/*/*.scss', gulp.series('css-compile'));
});

gulp.task('default', gulp.series(
    gulp.parallel('html-compile', 'css-compile'),
    gulp.parallel('watch', 'server')
))