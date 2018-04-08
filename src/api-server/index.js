/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name index.js
 * @author Ray McClain
 * @desc  
 * 
 * Last Modified: Sunday, 8th April 2018 1:14:21 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import Express from 'express';
import Morgan from 'morgan';

const app = Express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send([1,2,3]);
});

app.listen(3000, () => {
    console.log('Listening on port 3000.');
});