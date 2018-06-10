'use strict'

const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const path = require('path')

module.exports = {
    mode: 'development',
    entry: [
        './src/entrypoint/upload.js'
    ],
    devServer: {
        hot: true,
        watchOptions: {
            poll: true
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/',
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'upload.html',
            template: 'page.ejs',
            inject: true,
            title: "Upload File"
        })
    ],
    output: {
        filename: 'bundle-upload.js',
        path: path.join(__dirname, '..', 'dist')
    },
    target: 'electron-renderer',
    node: {
        __dirname: false
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    externals: [nodeExternals({
        whitelist: ['vue', '@fortawesome/fontawesome', '@fortawesome/fontawesome-free-solid', '@fortawesome/fontawesome-brands', 'webpack/hot/dev-server']
    })]
}