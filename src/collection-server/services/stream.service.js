/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name stream.service.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Sunday, 22nd April 2018 4:56:16 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import _ from 'lodash';
import Queue from 'COLLECTION/helpers/api_queue';
import Stream from 'DATABASE/stream_data/models/Stream';
import LiveStream from 'DATABASE/stream_data/models/LiveStream';
import Log from 'DATABASE/stream_data/models/Log';

const TWITCH_API = 'https://api.twitch.tv/kraken/streams/';
const UNIQUE_ID = 'stream_id';
const INCREMENT = 100;
const MIN_VIEWERS = 1;
const MAX_STREAMS = 50000;
const MAX_QUEUE = 10000;
const STREAM_KEYS = {
    '_id': 'stream_id',
    'name': 'stream_name',
    'display_name': 'display_name',
    'views': 'views',
    'viewers': 'viewers',
    'followers': 'followers',
    'url': 'url',
    'broadcaster_language': 'language',
    'partner': 'partner',
    'mature': 'mature',
    'game': 'game'
};

export default class StreamService {
    constructor (config) {
        this.queue = new Queue(config.twitch_key, TWITCH_API, UNIQUE_ID, MAX_STREAMS, MAX_QUEUE, INCREMENT, this.filterStreamData, this.writeStreamsToDB, this.getTotal);
    }

    getData () {
        console.log('Starting Stream Collection');
        return this.queue.getData();
    }

    getTotal (data) {
        return data._total;
    }

    filterStreamData (data) {
        
        data = _.map(data, i => _.pick(i, [
            'channel',
            'viewers'
        ]));
        
        data = _.map(data, i => _.merge(i, i.channel));
        
        return _.chain(data)
            .map(i => _.pick(i, Object.keys(STREAM_KEYS)))
            .map((obj) => {
                return _.mapKeys(obj, (value, key) => {
                    return STREAM_KEYS[key];
                });
            })
            .value();
    }

    writeStreamsToDB (entries) {
        Stream
            .bulkCreate(entries, {
                hooks: true,
                validate: true,
                benchmark: true,
                updateOnDuplicate:true
            }).then((createdInstances) => {
                var live = createdInstances.map((obj) => {
                    return {
                        streamId: obj.dataValues.id
                    };
                });
                LiveStream.truncate().then(() => {
                    LiveStream.bulkCreate(live, {
                        validate: true
                    });
                });
            }, (err) => {
            });
    }

    clearLiveTable () {
        return LiveStream
            .truncate();
    }
}