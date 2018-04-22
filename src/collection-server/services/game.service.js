/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name game.service.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Monday, 16th April 2018 6:50:43 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import _ from 'lodash';
import axios from 'axios';

var fs = require('fs');

import Game from 'DATABASE/stream_data/models/Game';

const MAX_GAMES = 50000;
const MAX_QUEUE = 10000;
const TWITCH_API = 'https://api.twitch.tv/kraken/games/top/';
const INCREMENT = 100;

const GAME_KEYS = {
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

export default class GameService {
    constructor (config) {
        this.axios = axios.create({
            headers: {
                'Client-ID': config.twitch_key
            }
        });

        this.queue = [];
        this.queueIds = [];
    }

    getGames (index = 0) {
        console.log('Fetching Games:', index, '-', index + 100);
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
                const games = data.top;
                let filtered = this.filterGameData(games);

                filtered = filtered.filter((obj) => this.queueIds.indexOf(obj.game_id) === -1);

                filtered.map((obj) => {
                    this.queueIds.push(obj.game_id);
                    return obj;
                });

                if(total > games.length + index && MAX_GAMES > games.length + index){
                    if(this.queue.length > MAX_QUEUE) {
                        this.writeGamesToDB(this.queue);
                        this.queue = [];
                        this.queueIds = [];
                    }
                    this.getGames(index + INCREMENT);
                } else {
                    console.log('Finished Game Collection');
                }
            });
    }

    filterGameData (data) {
        data = _.map(data, i => _.pick(i, [
            'game',
            'channels',
            'viewers'
        ]));
        
        data = _.map(data, i => _.merge(i, i.channel));
        
        return _.chain(data)
            .map(i => _.pick(i, Object.keys(GAME_KEYS)))
            .map((obj) => {
                return _.mapKeys(obj, (value, key) => {
                    return GAME_KEYS[key];
                });
            })
            .value();
    }

    writeGamesToDB (entry) {
        
    }
}