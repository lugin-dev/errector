import gulp from 'gulp';
import fs from 'fs';
import { _path } from '../config/config.global'
import yaml from 'js-yaml'
let siteConfig = yaml.load(fs.readFileSync(_path.siteConfig, 'utf8'));

gulp.task('zipapp', () => {
    return gulp.src(_path.app.root + '/**/*.*')
        .pipe(glp.zip(`app(${siteConfig.site_name}).zip`))
        .pipe(gulp.dest(_path.app.root))
})