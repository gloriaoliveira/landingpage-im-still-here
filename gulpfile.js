const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

// Processa JavaScript (com Babel para ES6)
function scripts() {
  return browserify({
    entries: './src/js/main.js',  // Arquivo principal
    debug: true
  })
  .transform(babelify.configure({
    presets: ['@babel/preset-env']
  }))
  .bundle()
  .pipe(source('bundle.min.js'))  // Saída minificada
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'));
}

// Processa SCSS para CSS
function styles() {
  return gulp.src('./src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'));
}

// Otimiza imagens
function images() {
  return gulp.src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
}

// Copia assets do Slick (CSS/fonts)
function slickAssets() {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/slick-carousel/slick/slick-theme.css',
    'node_modules/slick-carousel/slick/fonts/**'
  ], { base: 'node_modules/slick-carousel/slick' })
  .pipe(gulp.dest('./dist/slick'));
}

// Tarefa padrão
exports.default = gulp.parallel(styles, scripts, images, slickAssets);

// Watch (para desenvolvimento)
exports.watch = function() {
  gulp.watch('./src/styles/**/*.scss', styles);
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./src/images/**/*', images);
};