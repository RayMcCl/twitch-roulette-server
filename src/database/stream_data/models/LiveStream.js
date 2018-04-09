/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name LiveStream.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Monday, 9th April 2018 2:06:29 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import Sequelize from 'sequelize';
import connection from '../connection';
import Stream from './Stream';

const LiveStream = connection.define('live_stream', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
});

Stream.hasOne(LiveStream);
LiveStream.belongsTo(Stream, { foreignKey: 'streamId' });

export default LiveStream;