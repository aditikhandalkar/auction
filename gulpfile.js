var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build', ['buildJs', 'copyHtml', 'copyPublic']);

gulp.task('buildJs', () => {
  return gulp.src('app/**/*.js')
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
