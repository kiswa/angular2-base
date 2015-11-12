var flo = require('fb-flo'),
    fs = require('fs'),

    server = flo('dist/',
            {
                port: 8888,
                host: '0.0.0.0',
                verbose: false,
                glob: ['**/*']
            },
            function(filepath, callback) {
                callback({
                    contents: fs.readFileSync('dist/' + filepath),
                    reload: true
                });
            });

server.once('ready', function() {
    console.log('Ready for fb-flo.');
});
