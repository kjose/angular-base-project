const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');

const { AotPlugin } = require('@ngtools/webpack');

const minimizeCss = false;
const baseHref = "";
const deployUrl = "";
const postcssPlugins = function () {
    // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
    const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
    const minimizeOptions = {
        autoprefixer: false,
        safe: true,
        mergeLonghand: false,
        discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
};
    return [
        postcssUrl({
            url: (URL) => {
            // Only convert root relative URLs, which CSS-Loader won't process into require().
            if (!URL.startsWith('/') || URL.startsWith('//')) {
        return URL;
    }
    if (deployUrl.match(/:\/\//)) {
        // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
        return `${deployUrl.replace(/\/$/, '')}${URL}`;
    }
    else if (baseHref.match(/:\/\//)) {
        // If baseHref contains a scheme, include it as is.
        return baseHref.replace(/\/$/, '') +
            `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
    }
    else {
        // Join together base-href, deploy-url and the original URL.
        // Also dedupe multiple slashes into single ones.
        return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
    }
}
}),
    autoprefixer(),
].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};




module.exports = {
    "resolve": {
        "extensions": [
            ".ts",
            ".js"
        ],
        "modules": [
            "./node_modules",
        ],
        "symlinks": true
    },
    "resolveLoader": {
        "modules": [
            "./node_modules",
        ]
    },
    "entry": {
        "main": [
            "./src/main.ts"
        ],
        "polyfills": [
            "./src/polyfills.ts"
        ],
        "styles": [
            "./src/styles.css"
        ]
    },
    "output": {
        "path": path.join(process.cwd(), "dist"),
        "filename": "[name].bundle.js",
        "chunkFilename": "[id].chunk.js"
    },
    "module": {
        "rules": [
            {
                "enforce": "pre",
                "test": /\.js$/,
                "loader": "source-map-loader",
                "exclude": [
                    /(\\|\/)node_modules(\\|\/)/
                ]
            },
            {
                "test": /\.html$/,
                "loader": "raw-loader"
            },
            {
                "test": /\.(eot|svg|cur)$/,
                "loader": "file-loader?name=[name].[hash:20].[ext]"
            },
            {
                "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
                "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
            },
            {
                "exclude": [
                    path.join(process.cwd(), "src/styles.css")
                ],
                "test": /\.css$/,
                "use": [
                    "exports-loader?module.exports.toString()",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    }
                ]
            },
            {
                "exclude": [
                    path.join(process.cwd(), "src/styles.css")
                ],
                "test": /\.scss$|\.sass$/,
                "use": [
                    "exports-loader?module.exports.toString()",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    },
                    {
                        "loader": "sass-loader",
                        "options": {
                            "sourceMap": false,
                            "precision": 8,
                            "includePaths": []
                        }
                    }
                ]
            },
            {
                "test": /\.ts$/,
                "loader": "@ngtools/webpack"
            }
        ]
    },
    "plugins": [
        new HtmlWebpackPlugin({
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
            "xhtml": true
        }),
        new AotPlugin({
            "mainPath": "main.ts",
            "replaceExport": false,
            "hostReplacementPaths": {
                "environments/environment.ts": "environments/environment.ts"
            },
            "exclude": [],
            "tsConfigPath": "src/tsconfig.app.json",
            "skipCodeGeneration": true
        })
    ]
};
