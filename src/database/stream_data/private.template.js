/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name private.template.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Sunday, 8th April 2018 11:23:51 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

const DATABASE_USER = 'root';
const DATABASE_PASS = 'root';
const DATABASE_HOST = '127.0.0.1';
const DATABASE_PORT = '33333';
const DATABASE = 'stream_data';

export const DATABASE_ADDRESS = `mysql://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE}`;