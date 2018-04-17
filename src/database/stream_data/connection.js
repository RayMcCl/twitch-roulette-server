/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name connection.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Monday, 16th April 2018 9:25:53 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import Sequelize from 'sequelize';

import { DATABASE_ADDRESS } from './private.js';

const sequelize = new Sequelize(DATABASE_ADDRESS, {
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci', 
    timestamps: true
  },
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;