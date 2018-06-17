import fancyLog from 'fancy-log';

export const config = {

    server: {
        // BrowserSync tunnel
        tunnel: null
    },

    deploy: {
        // vinyl-ftp
        tofolder: 'public_html/youfolder',
        settings: {
            host: 'youhost',
            user: 'username',
            password: 'password',
            parallel: 10,
            log: fancyLog
        }
    },

    typograf: {
        on: true
    }

}


let src = 'src';
let app = 'app';

export const _path = {

    src: {
        root: src,
        sass: src + '/sass',
        img: src + '/img',
        js: src + '/js',
        fonts: src + '/fonts',
        components: src + '/components'
    },

    app: {
        root: app,
        css: app + '/css',
        img: app + '/img',
        js: app + '/js',
        fonts: app + '/fonts',
    },

    siteConfig: src + '/_site.config.yml',

    // For replace path's in .html
    htmlReplaces: [
        ['src="../../', 'src="'],
        ['src="../', 'src="'],
        ['href="../../img/', 'href="img/'],
        ['href="../img/', 'href="img/'],
        ['url("../../', 'url("'],
        ['url("../', 'url("'],
        ['url(../../', 'url('],
        ['url(../', 'url('],
    ],

    // For replace all saas
    sassReplaces: [
        ['../../../', '../'],
        ['../../', '../'],
    ],


};