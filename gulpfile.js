const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass().on('error', sass.logError))  // Compila o SCSS sem o outputStyle aqui
        .pipe(cleanCSS({ level: 2 }))  // Minifica o CSS
        .pipe(gulp.dest('./dist/css'));  // Salva o arquivo minificado
}

exports.default = styles;

exports.watch = function() {
    gulp.watch('./src/styles/*.scss',gulp.parallel(styles));
}