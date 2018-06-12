'use strict'

const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path')

module.exports = {
    mode: 'development',
    entry: [
        './src/entrypoint/editor.js'
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
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.ttf$/,
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
            filename: 'editor.html',
            template: './src/template/page.ejs',
            inject: true,
            title: "WYSIWYG Editor"
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '..', 'assets', 'static'),
                to: path.join(__dirname, '..', '..', 'dist'),
                toType: 'dir'
            }
        ])
    ],
    output: {
        filename: 'bundle-editor.js',
        path: path.join(__dirname, '..', '..', 'dist')
    },
    target: 'electron-renderer',
    node: {
        __dirname: false
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}
