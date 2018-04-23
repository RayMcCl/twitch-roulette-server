/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name LiveStream.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Sunday, 22nd April 2018 6:32:00 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import Sequelize from 'sequelize';
import connection from '../connection';
import Stream from './Stream';
import Game from './Game';

const LiveStream = connection.define('live_stream', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
});

Stream.hasOne(LiveStream);
LiveStream.belongsTo(Stream, { foreignKey: 'streamId' });
LiveStream.hasOne(Game);

export default LiveStream;