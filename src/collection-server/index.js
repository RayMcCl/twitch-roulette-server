/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name index.js
 * @author Ray McClain
 * @desc  
 * 
 * Last Modified: Monday, 16th April 2018 10:38:58 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import schedule from 'node-schedule';

import Stream from 'DATABASE/stream_data/models/Stream';
import config from './private';
import connection from 'DATABASE/stream_data/connection';
import StreamService from './services/stream.service';
import Tunnel from 'SSH/tunnel';
// import GameService from './services/game.service';

if(config.ENV === 'dev'){
    console.log('Started in Dev Mode');
    // Create an SSH Tunnel into the server
    new Tunnel(init);
} else {
    init();
}

function init () {
    const streamService = new StreamService(config);
    // const gameService = new GameService(config);
    connection.sync().then(() => {
        streamService.getLiveStreams();
        // gameService.getGames();
    });
    
    const twitchRequests = schedule.scheduleJob('*/10 * * * *', () => {
        streamService.getLiveStreams();
    });
}