/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name stream.service.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Monday, 9th April 2018 3:46:11 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import _ from 'lodash';
import axios from 'axios';
import connection from 'DATABASE/stream_data/connection';
import Stream from 'DATABASE/stream_data/models/Stream';
import LiveStream from 'DATABASE/stream_data/models/LiveStream';
import Log from 'DATABASE/stream_data/models/Log';

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

    getLiveStreams () {
        this.clearLiveTable().then(this.getStreams.bind(this));
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
                const filtered = this.filterStreamData(streams);
                
                for(var i = 0; i < filtered.length; i++){
                    this.writeStreamsToDB(filtered[i]);
                }
                
                if(total > streams.length + index){
                    this.getStreams(index + INCREMENT);
                }
            });
    }

    filterStreamData (data) {
        var keyMapping = {
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
        
        data = _.map(data, i => _.pick(i, [
            'channel',
            'viewers'
        ]));
        
        data = _.map(data, i => _.merge(i, i.channel));
        
        return _.chain(data)
            .map(i => _.pick(i, [
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
            ]))
            .map((obj) => {
                return _.mapKeys(obj, (value, key) => {
                    return keyMapping[key];
                });
            })
            .value();
    }

    writeStreamsToDB (entry) {
        var stream = Stream.build(entry);
        return Stream
            .upsert(stream.get())
            .then(() => {
                LiveStream.upsert({
                    streamId: stream.get('id')
                });
                Log.create({
                    streamId: stream.get('id'),
                    ...entry
                });
            });
    }

    clearLiveTable () {
        return LiveStream
            .truncate();
    }
}