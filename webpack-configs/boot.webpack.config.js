'use strict'

const webpack = require('webpack')
const path = require('path')

module.exports = {
    mode: 'development',
    entry: [
        './src/entrypoint/boot.js'
    ],
    devServer: {
        hot: true,
        watchOptions: {
            poll: true
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: 'bundle-boot.js',
        path: path.join(__dirname, '..', 'dist')
    },
    target: 'electron-main',
    node: {
        __dirname: false
    }
}
