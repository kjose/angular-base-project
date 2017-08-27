/**
 * AOT Plugin config
 */

const { AotPlugin } = require('@ngtools/webpack');

module.exports = new AotPlugin({
    "mainPath": "main.ts",
    "replaceExport": false,
    "hostReplacementPaths": {
        "environments/environment.ts": "environments/environment.ts"
    },
    "exclude": [],
    "tsConfigPath": "src/tsconfig.app.json",
    "skipCodeGeneration": true
});
