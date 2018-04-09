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

const USER = 'root';
const PASS = 'root';

const HOST = 'localhost';
const PORT = '8008';
const DATABASE = 'stream_data';

export const sqlAddress = `mysql://${USER}:${PASS}@${HOST}:${PORT}/${DATABASE}`;