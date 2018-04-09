/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name index.js
 * @author Ray McClain
 * @desc  
 * 
 * Last Modified: Monday, 9th April 2018 4:11:52 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import Express from 'express';
import cors from 'cors';
import Morgan from 'morgan';
import Sequelize from 'sequelize';
import Stream from 'DATABASE/stream_data/models/Stream';
import LiveStream from 'DATABASE/stream_data/models/LiveStream';

const app = Express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/streams', cors(), (req, res) => {
    LiveStream
        .find({
            order: [
                Sequelize.fn( 'RAND' ),
            ]
        })
        .then(results => {
            return Stream.find({
                where: {
                    id: results.streamId
                }
            });
        })
        .then(results => res.send(JSON.stringify(results)));
});

app.listen(3000, () => {
    console.log('Listening on port 3000.');
});