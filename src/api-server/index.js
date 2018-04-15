/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name index.js
 * @author Ray McClain
 * @desc  
 * 
 * Last Modified: Saturday, 14th April 2018 5:24:28 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import Express from 'express';
import cors from 'cors';
import Morgan from 'morgan';
import config from './private';
import Tunnel from 'SSH/tunnel';

// Routes
import StreamRoute from './routes/stream';
import LiveStreamRoute from './routes/live-stream';

if(config.ENV === 'dev'){
    console.log('Started in Dev Mode');
    // Create an SSH Tunnel into the server
    new Tunnel(init);
} else {
    init();
}

function init () {
    const app = Express();

    const stream = new StreamRoute(app);
    const liveStream = new LiveStreamRoute(app);

    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.listen(config.PORT, () => {
        console.log('Listening on port ' + config.PORT + '.');
    });
}
