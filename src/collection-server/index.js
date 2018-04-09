/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name index.js
 * @author Ray McClain
 * @desc  
 * 
 * Last Modified: Sunday, 8th April 2018 8:56:16 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import Stream from 'DATABASE/stream_data/models/Stream';
import config from './config';
import StreamService from './services/stream.service';

const streamService = new StreamService(config);

streamService.getLiveStreams();