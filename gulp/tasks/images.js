import gulp from 'gulp';
import { _path } from '../config/config.global';
import { browsersync } from './server';
import imgJpeg from 'imagemin-jpegoptim';
import imgSvg from 'imagemin-svgo';
import imgPng from 'imagemin-pngquant';

gulp.task('images', () => {
    return gulp.src([
            _path.src.img + '/**/*',
            '!' + _path.src.img + '/_favicon.png',
            '!' + _path.src.img + '/svg/{_include,_sprite}/**/*.*',
            '!' + _path.src.img + '/svg/{_include,_sprite}/*',
            '!' + _path.src.img + '/svg/{_include,_sprite}',
        ], { since: gulp.lastRun('images') })
        .pipe(glp.if(!DEVMODE,
            glp.imagemin([
                imgJpeg({
                    progressive: true,
                    interlaced: true,
                    max: 70,
                }),
                imgPng(),
                imgSvg({
                    removeComments: true,
                    removeTitle: true,
                    removeEmptyAttrs: true,
                    removeHiddenElems: true,
                    removeEmptyText: true,
                    removeEmptyContainers: true,
                    removeViewBox: false,
                    convertStyleToAttrs: true,
                    collapseGroups: true,
                    convertTransform: true,
                    removeUnknownsAndDefaults: true,
                    removeNonInheritableGroupAttrs: true,
                    removeUnusedNS: true,
                    cleanupIDs: true,
                }),
            ], {
                verbose: true,
                svgoPlugins: [{ removeViewBox: false, removeTitle: true, }],
            })
        ))
        .pipe(gulp.dest(_path.app.img))
        .on('end', browsersync.reload)
})