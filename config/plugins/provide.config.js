/**
 * AOT Plugin config
 */

const webpack = require('webpack');

module.exports = new webpack.ProvidePlugin({
    "jQuery" : 'jquery',
    "jquery" : 'jquery',
    "$" : 'jquery'
});