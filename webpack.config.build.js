/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

/**
 * dependencies
 */
const path = require('path');

/**
 * public
 */
module.exports = {
    entry: [
        './src/hello.js',
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        library: 'moduleTest',
        libraryTarget: 'umd',
    },

    resolve: {
        extensions: ['', '.js'],
        root: path.resolve(path.join(__dirname, 'src')),
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src'),
        }],
    },
};
