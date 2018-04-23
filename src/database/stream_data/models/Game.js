/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name Game.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Sunday, 22nd April 2018 7:58:31 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import Sequelize from 'sequelize';
import connection from '../connection';
import Stream from './Stream';

const Game = connection.define('game', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    game_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING(150)
    },
    popularity: {
        type: Sequelize.INTEGER
    },
    channels: {
        type: Sequelize.INTEGER
    },
    viewers: {
        type: Sequelize.INTEGER
    },
    box_large: {
        type: Sequelize.TEXT
    },
    box_medium: {
        type: Sequelize.TEXT
    },
    box_small: {
        type: Sequelize.TEXT
    },
    logo_large: {
        type: Sequelize.TEXT
    },
    logo_medium: {
        type: Sequelize.TEXT
    },
    logo_small: {
        type: Sequelize.TEXT
    }
});

export default Game;