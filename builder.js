'use strict';

var methods = {
    appComponentBuilder: require('./lib/app-component-builder'),
    cssStripLoader: require('./lib/css-strip-loader'),
    getVersion: require('./lib/getversion'),
    killProcess: require('./lib/kill-process'),
    runDevelopmentServer: require('./lib/run-development-server'),
    runWebpack: require('./lib/run-webpack'),
    viewComponentBuilder: require('./lib/view-component-builder.js')
};

module.exports = methods;