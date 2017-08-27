/**
 * HTML Webpack Plugin config
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

function packageSort(packages) {
    // packages = ['polyfills', 'vendor', 'app']
    var len = packages.length - 1;
    var first = packages[0];
    var last = packages[len];
    return function sort(a, b) {
        // polyfills always first
        if (a.names[0] === first) {
            return -1;
        }
        // app always last
        if (a.names[0] === last) {
            return 1;
        }
        // vendor before app
        if (a.names[0] !== first && b.names[0] === last) {
            return -1;
        } else {
            return 1;
        }
    }
}

module.exports = new HtmlWebpackPlugin({
    "template": "./src/index.html",
    "filename": "./index.html",
    "hash": false,
    "inject": true,
    "compile": true,
    "favicon": false,
    "minify": false,
    "cache": true,
    "showErrors": true,
    "chunks": "all",
    "excludeChunks": [],
    "title": "Webpack App",
    "xhtml": true,
    "chunksSortMode": packageSort(['vendor', 'polyfills', 'main'])
});
