import fs from 'fs'
import gulp from 'gulp'
import yaml from 'js-yaml'
import { _path, config } from '../config/config.global'
import { browsersync } from './server'


gulp.task('html:dev', () => {

    let siteConfig = yaml.load(fs.readFileSync(_path.siteConfig, 'utf8'));

    return gulp.src([
            `${_path.src.root}/*.html`,
            `!${_path.src.root}/_site.config.js`
        ])
        .pipe(glp.plumber( /* { errorHandler: glp.notify.onError() } */ ))
        .pipe(glp.frontMatter({ property: 'data' }))
        .pipe(glp.data(() => {
            return siteConfig;
        }))
        .pipe(glp.nunjucksRender({
            path: [`${_path.src.root}/`]
        })).on('error', errr => console.log(errr))
        .pipe(glp.if(config.typograf.on,
            glp.typograf({
                locale: ['ru', 'en-US'],
                htmlEntity: { type: 'name' },
                safeTags: [
                    ['<\\?php', '\\?>'],
                    ['<no-typography>', '</no-typography>']
                ],
            })
        ))
        .pipe(glp.prettify({
            indent_size: 2,
            preserve_newlines: false,
        }))
        .pipe(glp.batchReplace(_path.htmlReplaces))
        .pipe(gulp.dest(_path.app.root))
        .on('end', browsersync.reload);

});


gulp.task('html:prod', () => {
    return gulp.src(`${_path.app.root}/*.html`)
        .pipe(glp.removeHtml())
        .pipe(glp.revReplace({
            manifest: gulp.src([
                _path.app.css + '/manifest.json',
                _path.app.js + '/manifest.json'
            ])
        }))
        .pipe(glp.fileInclude({
            prefix: '@@'
        }))
        .pipe(glp.batchReplace(_path.htmlReplaces))
        .pipe(gulp.dest(_path.app.root))
});

gulp.task('html:build',
    gulp.series(
        'html:dev',
        'html:prod'
    ))