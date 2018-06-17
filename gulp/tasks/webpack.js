import fancyLog from 'fancy-log';
import gulp from 'gulp';
import vname from 'vinyl-named';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import { _path } from '../config/config.global';
import { createWebpackConfig } from '../config/webpack.config';
import { browsersync } from './server';

let checkBuild = false;

function done(err, stats) {
    checkBuild = true;

    if (err) return

    fancyLog[stats.hasErrors() ? 'error' : 'info']('Webpack' + stats.toString({ colors: true }));

}

gulp.task('webpack', callback => {

    let webpackConfig = createWebpackConfig();

    return gulp.src(`${_path.src.js}/*.js`)
        .pipe(glp.plumber({
            errorHandler: glp.notify.onError(err => ({
                title: 'Webpack',
                message: err.message
            }))
        }))
        .pipe(vname())
        .pipe(webpackStream(webpackConfig, webpack, done))
        .pipe(gulp.dest('app/js'))
        .on('data', function() {
            if (checkBuild) callback()
        })
        .pipe(browsersync.stream())
});