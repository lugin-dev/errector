import gulp from 'gulp';
import streamCombiner from 'stream-combiner2';
import { _path } from '../config/config.global';
import { browsersync } from './server';

const combiner = streamCombiner.obj


gulp.task('sass', () => {

    return gulp.src(_path.src.sass + '/*.sass')
        .pipe(glp.plumber({ errorHandler: glp.notify.onError() }))
        .pipe(glp.if(DEVMODE, glp.sourcemaps.init()))
        .pipe(glp.sass())
        .pipe(glp.batchReplace(_path.sassReplaces))
        .pipe(glp.groupCssMediaQueries())
        .pipe(glp.autoprefixer(['last 15 versions']))
        .pipe(glp.if(!DEVMODE, combiner(glp.csso(), glp.rev())))
        .pipe(glp.if(DEVMODE, glp.sourcemaps.write()))
        .pipe(gulp.dest(_path.app.css))
        .pipe(glp.if(DEVMODE, browsersync.reload({ stream: true })))
        .pipe(glp.if(!DEVMODE, combiner(
            glp.rev.manifest('manifest.json'),
            gulp.dest(_path.app.css)
        )))

});