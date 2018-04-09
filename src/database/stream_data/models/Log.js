/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name Log.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Monday, 9th April 2018 3:40:57 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import Sequelize from 'sequelize';
import connection from '../connection';
import Stream from './Stream';

const Log = connection.define('log', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    game: {
        type: Sequelize.STRING(150)
    },
    followers: {
        type: Sequelize.INTEGER
    },
    viewers: {
        type: Sequelize.INTEGER
    }
});

Stream.hasMany(Log);
Log.belongsTo(Stream, { foreignKey: 'streamId' });

export default Log;