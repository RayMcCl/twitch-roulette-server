/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name Stream.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Monday, 9th April 2018 2:06:32 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */
import Sequelize from 'sequelize';
import connection from '../connection';

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

export default Stream;