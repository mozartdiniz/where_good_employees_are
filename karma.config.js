/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

/**
 * dependencies
 */
const webpack = require('karma-webpack');
const webpackConfig = require('./webpack.config');

/**
 * settings
 */
webpackConfig.module.loaders = [{
    test: /\.(js)$/,
    exclude: /(bower_components|node_modules)/,
    loader: 'babel-loader',
}];

webpackConfig.module.postLoaders = [{
    test: /\.(js)$/,
    exclude: /(node_modules|bower_components|test)/,
    loader: 'istanbul-instrumenter',
}];

/**
 * public
 */
module.exports = (config) => {
    config.set({
        frameworks: ['jasmine'],

        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'test/**/*.spec.js',
        ],

        plugins: [
            webpack,
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-spec-reporter',
        ],

        browsers: ['Chrome'],

        preprocessors: {
            'test/**/*.spec.js': ['webpack'],
            'src/**/*.js': ['webpack'],
        },

        reporters: ['spec', 'coverage'],

        coverageReporter: {
            dir: 'build/reports/coverage',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' },
                { type: 'cobertura', subdir: '.', file: 'coverage.txt' },
            ],
        },

        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
        },
    });
};
