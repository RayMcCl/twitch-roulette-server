/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name stream.service.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Sunday, 8th April 2018 11:07:46 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import _ from 'lodash';
import axios from 'axios';
import Stream from 'DATABASE/stream_data/models/stream';

const TWITCH_API = 'https://api.twitch.tv/kraken/streams/';
const INCREMENT = 100;

export default class StreamService {
    constructor (config) {
        this.axios = axios.create({
            headers: {
                'Client-ID': config.twitch_key
            }
        });
    }

    getLiveStreams (index = 0) {
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
                const filtered = this.filterStreamData(streams);
                
                for(var i = 0; i < filtered.length; i++){
                    this.writeStreamsToDB(filtered[i]).catch((err) => {
                        console.log(err);
                    });
                }

                if(total > streams.length + index){
                    this.getLiveStreams(index + INCREMENT);
                }
            });
    }

    filterStreamData (data) {
        var keyMapping = {
            '_id': 'stream_id',
            'name': 'stream_name',
            'display_name': 'display_name',
            'views': 'views',
            'followers': 'followers',
            'url': 'url',
            'broadcaster_language': 'language',
            'partner': 'partner',
            'mature': 'mature'
        };

        return _.chain(data)
            .map('channel')
            .map(i => _.pick(i, [
                '_id',
                'name',
                'display_name',
                'views',
                'followers',
                'url',
                'broadcaster_language',
                'partner',
                'mature'
            ]))
            .map((obj) => {
                return _.mapKeys(obj, (value, key) => {
                    return keyMapping[key];
                });
            })
            .value();
    }

    writeStreamsToDB (entry) {
        return Stream
            .upsert(entry); 
    }
}