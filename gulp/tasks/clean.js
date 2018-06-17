import gulp from 'gulp'
import del from 'del'
import { _path } from '../config/config.global'

gulp.task('remove:app', () => {
    return del(_path.app.root, { force: true })
})