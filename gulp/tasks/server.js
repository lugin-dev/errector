import gulp from 'gulp'
let browsersync = require('browser-sync').create()
import { _path, config } from '../config/config.global'

gulp.task('server', function() {

    browsersync.init({
        server: {
            baseDir: _path.app.root
        },
        notify: false,
        port: 8080,
        // Tunnel defaul false
        // see gulp/config/config.global.js
        tunnel: config.server.tunnel,
    });

});


export { browsersync };