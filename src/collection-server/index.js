/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name index.js
 * @author Ray McClain
 * @desc  
 * 
 * Last Modified: Monday, 9th April 2018 3:51:19 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import schedule from 'node-schedule';

import Stream from 'DATABASE/stream_data/models/Stream';
import config from './private';
import connection from 'DATABASE/stream_data/connection';
import StreamService from './services/stream.service';

const streamService = new StreamService(config);

const twitchRequests = schedule.scheduleJob('*/10 * * * *', () => {
    connection.sync().then(() => {
        streamService.getLiveStreams();
    });
});