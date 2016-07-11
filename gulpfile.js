var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build', ['buildJs', 'copyHtml', 'copyPublic', 'copyModules']);

gulp.task('buildJs', ['buildLib', 'buildModels', 'buildIndex']);

gulp.task('buildModels', () => {
  return gulp.src('app/models/**/*.js')
  .pipe(babel({presets: ['es2015']}))
  .pipe(gulp.dest('build/models'));
});

gulp.task('buildLib', () => {
  return gulp.src('app/lib/**/*.js')
  .pipe(babel({presets: ['es2015']}))
  .pipe(gulp.dest('build/lib'));
});

gulp.task('buildIndex', () => {
  return gulp.src('app/index.js')
  .pipe(babel({presets: ['es2015']}))
  .pipe(gulp.dest('build'));
});

gulp.task('copyHtml', () => {
  return gulp.src('app/**/*.html')
  .pipe(gulp.dest('build'));
});

gulp.task('copyPublic', () => {
  return gulp.src('app/public/**/*')
  .pipe(gulp.dest('build/public'));
});

gulp.task('copyModules', () => {
  return gulp.src('app/node_modules/**/*')
  .pipe(gulp.dest('build/node_modules'));
});
