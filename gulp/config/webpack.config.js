import webpack from 'webpack'
import createManiset from 'webpack-manifest-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import path from 'path';

let outPath = '/js/'

function createWebpackConfig() {

    let webpackConfig = {

        mode: DEVMODE ? 'development' : 'production',
        watch: DEVMODE,
        watchOptions: {
            aggregateTimeout: 100
        },

        output: {
            filename: DEVMODE ? '[name].js' : '[name]-[chunkhash:10].js',
            publicPath: outPath
        },

        devtool: DEVMODE ? 'cheap-inline-source-map' : false,

        optimization: {
            minimize: !DEVMODE,
            splitChunks: {
                name: 'common',
                chunks: 'all',
                minChunks: 3,
                minSize: 30000
            }
        },

        module: {
            rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['env']
                    }
                }
            }]
        },

        resolve: {
            extensions: ['.js'],
            alias: {
                // TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js')
            }
        },

        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.ProvidePlugin({
                // $: 'jquery',
                // jQuery: 'jquery'
            })
        ]

    }

    if (!DEVMODE) {

        webpackConfig.plugins.push(

            new createManiset({
                publicPath: '',
                fileName: 'manifest.json'
            }),

            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        typeofs: false,
                    },
                    output: {
                        comments: false
                    }
                }
            })

        )

    }

    return webpackConfig;

}

export { createWebpackConfig }