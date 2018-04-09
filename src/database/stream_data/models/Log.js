/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name Log.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Sunday, 8th April 2018 7:11:39 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import Sequelize from 'sequelize';
import connection from '../connection';

const Log = connection.define('log', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    game: {
        type: Sequelize.STRING(45)
    },
    viewers: {
        type: Sequelize.INTEGER
    },
    featured: {
        type: Sequelize.INTEGER
    }
});

export default Log;