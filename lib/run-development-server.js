'use strict';

let devserver;

const exec = require('child_process').exec,
      notify = require('node-notify'),
      watch = require('gulp-watch'),
      getversion = require('./getversion'),
      version = getversion(),
      Path = require('path'),
      killProcess = require('./kill-process');

const watcher = (child) => {
    const watcher = watch(Path.join(process.cwd(), '../src/'+version.developmentString+'/**/*'), () => {
        watcher.close();
        killProcess(child.pid, true, null, () => {
            process.chdir(Path.join(process.cwd(), '../'));
            devserver();
        });
    });
};

const DevServer = env => {
    const child = exec('node ./server.js '+env);
    devserver = require(Path.join(process.cwd(), '../lib/gulp_callbacks/devserver'+(((env==='phone') || (env==='tablet')) ? env : '')));

    child.stdout.on('data', data => {
        console.log(data);
        notify({
            title: 'Development server',
            message: data
        });
    });
    child.stderr.on('data', data => {
        console.log(data);
        notify({
            title: 'Error on development server',
            message: data,
            sound: true
        });
    });
    child.on('close', (data) => {
        console.log(data);
        notify({
            title: 'Development server',
            message: 'Server stopped',
            sound: true
        });
    });

    watcher(child);
};

module.exports = DevServer;