/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

/**
 * dependencies
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

/**
 * create a new webpack dev server
 */
new WebpackDevServer(webpack(config), {
    contentBase: './dist',
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
}).listen(config.serverPort, 'localhost', (err) => {
    // eslint-disable-next-line no-console
    console.log(err || `Listening at localhost:${config.serverPort}`);
});
