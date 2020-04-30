var gulp = require('gulp');
const { src, dest, series } = require('gulp');
var gsass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

function sass() {
    return src('./source/scss/*.scss')
            .pipe(gsass({outputStyle: 'compressed'}).on('error', gsass.logError))
            .pipe(autoprefixer())
            .pipe(dest('./source/css'))
}

// 实时编译
function watch() {
    gulp.watch('./source/scss/**/*.scss',series(sass));
}

gulp.task('default',series(watch));