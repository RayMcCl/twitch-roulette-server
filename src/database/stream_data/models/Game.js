/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name Game.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Monday, 16th April 2018 6:37:21 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import Sequelize from 'sequelize';
import connection from '../connection';

const Game = connection.define('game', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
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
    box_template: {
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
    },
    logo_template: {
        type: Sequelize.TEXT
    }
});

export default Game;