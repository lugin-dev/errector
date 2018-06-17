import gulp from 'gulp';
import { _path } from '../config/config.global';

gulp.task('fonts', () => {
    return gulp.src(_path.src.fonts + '/**/*', { since: gulp.lastRun('images') })
        .pipe(gulp.dest(_path.app.fonts))
});