/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

/**
 * dependencies
 */
const webpack = require('webpack');
const path = require('path');

/**
 * settings
 */
const serverPort = process.env.SERVER_PORT || 4000;

/**
 * public
 */
module.exports = {
    serverPort,
    devtool: 'eval-source-map',

    entry: [
        `webpack-dev-server/client?http://localhost:${serverPort}`,
        'webpack/hot/dev-server',
        './src/index',
    ],

    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/static/',
    },

    resolve: {
        extensions: ['', '.js'],
        root: path.resolve(path.join(__dirname, 'src')),
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],

    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src'),
        }],
    },
};
