var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build', () => {
  return gulp.src('app/**/*.js')
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('build'));
});
