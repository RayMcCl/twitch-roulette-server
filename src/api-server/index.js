/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name index.js
 * @author Ray McClain
 * @desc  
 * 
 * Last Modified: Sunday, 22nd April 2018 7:36:57 pm
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
import GameRoute from './routes/game';

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
    const game = new GameRoute(app);

    app.use(cors());      

    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.listen(config.PORT, () => {
        console.log('Listening on port ' + config.PORT + '.');
    });
}
