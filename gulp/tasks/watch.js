import chalk from 'chalk';
import del from 'del';
import fancyLog from 'fancy-log';
import fs from 'fs';
import gulp from 'gulp';
import { _path } from '../config/config.global';


gulp.task('watch', () => {

    // Watch all html
    gulp.watch([
            _path.src.root + '/*.html',
            _path.src.components + '/**/*.html',
        ],
        gulp.series('html:dev'));


    // Watch _site.config
    gulp.watch(_path.siteConfig, gulp.series('html:dev'));


    // Watch sass
    gulp.watch([
            _path.src.sass + '/**/*.*',
            _path.src.components + '/**/*.sass',
        ],
        gulp.series('sass'));


    // Watch images exclude svg
    gulp.watch([
                _path.src.img + '/**/*',
                '!' + _path.src.img + '/_favicon.png',
                '!' + _path.src.img + '/svg/{_include,_sprite}/**/*.*',
                '!' + _path.src.img + '/svg/{_include,_sprite}/*',
                '!' + _path.src.img + '/svg/{_include,_sprite}',
            ],
            gulp.series('images'))
        .on('add', file => addFile(file))
        .on('unlink', file => removeFile(file))


    // Watch SVG
    gulp.watch(_path.src.img + '/svg/_include/*.*', gulp.series('svg:include'));

    gulp.watch(_path.src.img + '/svg/_sprite/*.*', gulp.series('svg:sprite'));

    // Watch fonts
    gulp.watch(_path.src.fonts + '/**/*.*', gulp.series('fonts'))
        .on('add', file => addFile(file))
        .on('unlink', file => removeFile(file))


})

// Onchange functions
let addFile = file => {
    fancyLog(chalk.green('Add file: ') + chalk.white(file))
    fs.utimesSync(file, (Date.now() / 1000), (Date.now() / 1000))
}

let removeFile = file => {
    fancyLog(chalk.yellow('Remove file: ') + chalk.white(file))
    del.sync(file.replace(_path.src.root, _path.app.root))
}