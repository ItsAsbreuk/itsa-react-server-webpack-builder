'use strict';

var fsp = require('fs-promise');
var Path = require('path');

var appComponentBuilder = {
    build: function(entryDir, view, tmpFile, viewFiles) {
        // var mainAppFile = './app.js',
        var mainAppFile = Path.join(entryDir, '/app.js'),
            data = '',
            enddata;
        data += 'window.__start_marker__=10;';
        viewFiles.forEach(view => data +='require.ensure(\'./views/'+view+'\',()=>{}),\''+view+'\';\n');
        data += 'window.__end_marker__=10;';
        enddata = 'window.__end_marker2__=10;';
        return fsp.readFile(mainAppFile, {encoding:'utf8'})
               .then(filedata => {
                    return fsp.writeFile(tmpFile, data + filedata + enddata);
               });
    }
};

module.exports = appComponentBuilder;