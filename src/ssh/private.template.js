var fs = require('fs');

export const SERVER_CONFIG = {
    username:'root',
    password:'root',
    host:'SSH_IP',
    port:22,
    dstHost:'127.0.0.1',
    dstPort:3306,
    localPort: 33333,
    privateKey: fs.readFileSync('./src/ssh/key.ppk'),
    passphrase:'PASS',
    keepAlive:true
};