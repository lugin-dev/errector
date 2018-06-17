import gulp from 'gulp';
import { _path } from '../config/config.global';
import imgSvg from 'imagemin-svgo';

gulp.task('svg:sprite', () => {
    return gulp.src(_path.src.img + '/svg/_sprite/*.svg')
        .pipe(glp.svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(glp.cheerio({
            run: function($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('[class]').removeAttr('class');
                $('title').remove();
                $('defs').remove();
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(glp.replace('&gt;', '>'))
        .pipe(glp.svgSprite({
            mode: {
                symbol: {
                    sprite: 'sprite.svg',
                    example: DEVMODE
                },
            },
            svg: {
                namespaceIDs: false,
                xmlDeclaration: false,
                rootAttributes: {
                    'style': 'display:none',
                },
            }
        }))
        .pipe(gulp.dest(_path.src.img + '/svg/_sprite/'))
});


gulp.task('svg:include', () => {
    return gulp.src(_path.src.img + '/svg/_include/**.*svg')
        .pipe(glp.imagemin([
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
        }))
        .pipe(gulp.dest(_path.src.img + '/svg/_include/minify/'))
});

gulp.task('svg', gulp.parallel('svg:sprite', 'svg:include'))