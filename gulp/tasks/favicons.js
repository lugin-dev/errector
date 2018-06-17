import gulp from 'gulp'
import del from 'del'
import fs from 'fs'
import yaml from 'js-yaml'
import { _path } from '../config/config.global'

gulp.task('favicons:remove', () => {
    return del(_path.src.img + '/favicons', { force: true })
})

gulp.task('favicons:create', () => {

    let siteConfig = yaml.load(fs.readFileSync(_path.siteConfig, 'utf8'))

    let devName = siteConfig.developer.author
    let devSite = siteConfig.developer.author_url
    let colorTh = siteConfig.color_theme

    devName ? devName = devName : devName = ''
    devSite ? devSite = devSite : devSite = ''
    colorTh ? devSite = colorTh : colorTh = '#fff'

    return gulp.src(_path.src.img + '/_favicon.png')
        .pipe(glp.favicons({
            appName: siteConfig.site_name,
            appDescription: null,
            developerName: devName,
            developerURL: devSite,
            background: colorTh,
            path: 'img/favicons/',
            display: 'browser',
            orientation: "any",
            version: '1.0',
            logging: true,
            online: false,
            icons: {
                favicons: true,
                firefox: { offset: 10 },
                windows: false,
                android: true,
                coast: { offset: 10 },
                appleStartup: false,
                appleIcon: { offset: 10 },
                yandex: true
            },
            html: _path.src.components + '/layouts/parts/favicons.html',
            replace: true
        }))
        .on('error', glp.notify.onError())
        .pipe(gulp.dest(_path.src.img + '/favicons/'));
})

gulp.task('favicons', gulp.series(
    'favicons:remove',
    'favicons:create'
))