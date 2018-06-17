import gulp from 'gulp';
import { config, _path } from '../config/config.global'
import vftp from 'vinyl-ftp';

gulp.task('deploy:ftp', () => {

    var conn = vftp.create(config.deploy.settings);

    return gulp.src(_path.app.root + '/**/*.*', { buffer: false })
        .pipe(conn.dest(`${config.deploy.folder}`));

});