const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

// 1. Copia HTML para a pasta dist
function copyHtml() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'));
}

// 2. Processa JavaScript
function scripts() {
  return browserify({
    entries: './src/js/main.js',
    debug: true
  })
  .transform(babelify.configure({
    presets: ['@babel/preset-env']
  }))
  .bundle()
  .pipe(source('bundle.min.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'));
}

// 3. Processa CSS
function styles() {
  return gulp.src('./src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'));
}

// 4. Otimiza imagens
function images() {
  return gulp.src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
}

// 5. Copia assets do Slick (ATUALIZADO)
function slickAssets() {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/slick-carousel/slick/slick-theme.css',
    'node_modules/slick-carousel/slick/fonts/**',
    'node_modules/slick-carousel/slick/ajax-loader.gif'
  ], { base: 'node_modules/slick-carousel/slick' })
  .pipe(gulp.dest('./dist/css/slick')); // Agora tudo vai para /css/slick
}

// 6. Move para public (Vercel)
function moveToPublic() {
  return gulp.src('./dist/**/*')
    .pipe(gulp.dest('./public'));
}

// Task padrão (ORDEM CORRIGIDA)
exports.default = gulp.series(
  gulp.parallel(copyHtml, styles, scripts, images, slickAssets),
  moveToPublic
);

// Watch (para desenvolvimento)
exports.watch = function() {
  gulp.watch('./src/*.html', copyHtml);
  gulp.watch('./src/styles/**/*.scss', styles);
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./src/images/**/*', images);
};