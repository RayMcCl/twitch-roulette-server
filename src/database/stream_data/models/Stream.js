/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name Stream.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Sunday, 8th April 2018 10:47:29 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */
import Sequelize from 'sequelize';
import connection from '../connection';
import Log from './Log';

const Stream = connection.define('stream', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    stream_id: {
        type: Sequelize.INTEGER,
        unique: true
    },
    stream_name: {
        type: Sequelize.STRING(45)
    },
    display_name: {
        type: Sequelize.STRING(45)
    },
    views: {
        type: Sequelize.INTEGER  
    },
    followers: {
        type: Sequelize.INTEGER  
    },
    url: {
        type: Sequelize.STRING
    },
    partner: {
        type: Sequelize.BOOLEAN
    },
    mature: {
        type: Sequelize.BOOLEAN
    },
    language: {
        type: Sequelize.STRING(5)
    }
});

Stream.hasMany(Log);

connection.sync().then(() => {
    
});

export default Stream;