import gulp from 'gulp'
import { _path } from '../config/config.global'
// import { logger } from '../tasks/console.log'
import yaml from 'js-yaml'
import fs from 'fs'

gulp.task('test', (cb) => {

    // let siteConfigReq = require('../../src/site.config.js')
    // let siteConfig = JSON.parse(
    //     siteConfigReq
    // );
    //  return gulp.src(_path.src.root + '/_site.config.js')
    //      .pipe(gulp.dest(_path.app.root))
    //  console.log('test.js', DEVMODE)
    // logger(`FROM test.js | DEVMODE: ${DEVMODE}`, 'green');
    cb()
});