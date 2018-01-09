'use strict'

const gulp  = require('gulp');
const bs    = require('browser-sync');
const sass    = require('gulp-sass');
const pug    = require('gulp-pug');
const multipipe    = require('multipipe');
const notify    = require('gulp-notify');
const concatCss    = require('gulp-concat-css');
const autoprefixer    = require('gulp-autoprefixer');
const clean    = require('del');


/*==== server ====*/
gulp.task('server', function() {
    bs.init({
        server: 'public'
    });
    bs.watch('public/**/*.*').on('change', bs.reload);
});

/*==== pug ====*/
gulp.task('pug', function() {
    return multipipe(
        gulp.src('frontend/pages/*.pug', {since: gulp.lastRun()}),
        pug({
            pretty: true
        }),
        gulp.dest('public');
    )
});
/*==== sass ====*/
gulp.task('sass', function(){
    return multipipe(
        gulp.src('frontend/sass/main.sass', {since: gulp.lastRun()}),
        sass(),
        autoprefixer(),
        concatCss('style.css'),
        gulp.dest('public')

    ).on('error',notify.onError());
});