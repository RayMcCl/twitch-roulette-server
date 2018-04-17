/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name stream.service.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Monday, 16th April 2018 10:08:12 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import _ from 'lodash';
import axios from 'axios';
import Stream from 'DATABASE/stream_data/models/Stream';
import LiveStream from 'DATABASE/stream_data/models/LiveStream';
import Log from 'DATABASE/stream_data/models/Log';
var fs = require('fs');

const TWITCH_API = 'https://api.twitch.tv/kraken/streams/';
const INCREMENT = 100;
const MIN_VIEWERS = 1;
const MAX_STREAMS = 50000;
const STREAM_RETAINED_KEYS = [
    '_id',
    'name',
    'display_name',
    'views',
    'followers',
    'url',
    'broadcaster_language',
    'partner',
    'mature',
    'game',
    'viewers'
];
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
        this.axios = axios.create({
            headers: {
                'Client-ID': config.twitch_key
            }
        });

        this.streamQueue = [];
        this.streamQueueIds = [];
    }

    getLiveStreams () {
        this.getStreams.bind(this);
    }

    getStreams (index = 0) {
        console.log('Fetching Live Streams:', index, '-', index + 100);
        this.axios
            .get(TWITCH_API, {
                params: {
                    offset: index,
                    limit: INCREMENT
                }
            })
            .then((res) => { 
                const data = res.data;
                const total = data._total;
                const streams = data.streams;
                let filtered = this.filterStreamData(streams);

                filtered = filtered.filter((obj) => this.streamQueueIds.indexOf(obj.stream_id) === -1);

                filtered.map((obj) => {
                    this.streamQueueIds.push(obj.stream_id);
                    return obj;
                });
                
                this.streamQueue = this.streamQueue.concat(filtered);

                if(total > streams.length + index && MAX_STREAMS > streams.length + index && filtered[filtered.length - 1].viewers > MIN_VIEWERS){
                    this.getStreams(index + INCREMENT);
                } else {
                    this.writeStreamsToDB(this.streamQueue);
                    this.streamQueue = [];
                    this.streamQueueIds = [];
                }
            });
    }

    filterStreamData (data) {
        
        data = _.map(data, i => _.pick(i, [
            'channel',
            'viewers'
        ]));
        
        data = _.map(data, i => _.merge(i, i.channel));
        
        return _.chain(data)
            .map(i => _.pick(i, STREAM_RETAINED_KEYS))
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
                updateOnDuplicate:true,
                individualHooks: true
            }).then((createdInstances) => {
                var live = createdInstances.map((obj) => {
                    return {
                        streamId: obj.dataValues.id
                    };
                });
                LiveStream.truncate().then(() => {
                    LiveStream.bulkCreate(live, {
                        validate: true,
                        individualHooks: true
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