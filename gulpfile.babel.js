import gulp from 'gulp';
import gulp_load_plugins from 'gulp-load-plugins';
import { envLog } from './gulp/tasks/console.log';
global.glp = gulp_load_plugins();

// Import all tasks
require('require-dir')('./gulp/tasks');


// Default task. Development mode
gulp.task('default', gulp.series(
    done => { setDevmode(true), done() },
    'remove:app', 'svg',
    gulp.parallel('html:dev', 'images', 'sass', 'fonts', 'webpack', 'watch', 'server')
))

// Build task. Production mode
gulp.task('build', gulp.series(
    done => { setDevmode(false), done() },
    'remove:app', 'html:dev',
    gulp.parallel('sass', 'webpack', 'images', 'fonts', 'svg'),
    'html:build',
    gulp.parallel('server')
))

// Build task without server. Production mode
gulp.task('build:noserver', gulp.series(
    done => { setDevmode(false), done() },
    'remove:app', 'html:dev',
    gulp.parallel('sass', 'webpack', 'images', 'fonts', 'svg'),
    'html:build'
))

// Build and zip 
gulp.task('build:zipapp', gulp.series('build:noserver', 'zipapp'))

// Build and deploy
gulp.task('build:deploy', gulp.series('build:noserver', 'deploy:ftp'))

let setDevmode = (devmode = true) => {
    global.DEVMODE = (devmode === true || devmode === undefined) ? true : false;
    envLog(DEVMODE);
}