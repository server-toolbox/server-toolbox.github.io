import '../3rd-party/ssh2.js'

export default {
    connect(opts){
        const conn = new ssh2;
        conn.on('ready', function() {
            console.log('Client :: ready');
            conn.shell(function(err, stream) {
                if (err) throw err;
                stream.on('close', function() {
                    console.log('Stream :: close');
                    conn.end();
                }).on('data', function(data) {
                    console.log('OUTPUT: ' + data);
                });
                stream.end('ls -l\nexit\n');
            });
        }).connect(opts);
    },
}
