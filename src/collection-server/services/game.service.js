/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name game.service.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Sunday, 22nd April 2018 6:24:05 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import _ from 'lodash';

import Game from 'DATABASE/stream_data/models/Game';
import Queue from 'COLLECTION/helpers/api_queue';

const UNIQUE_ID = 'game_id';
const MAX_GAMES = 50000;
const MAX_QUEUE = 500;
const TWITCH_API = 'https://api.twitch.tv/kraken/games/top/';
const INCREMENT = 100;
const GAME_KEYS = {
    '_id': 'game_id',
    'name': 'name',
    'popularity': 'popularity',
    'channels': 'channels',
    'viewers': 'viewers',
    'box_large': 'box_large',
    'box_medium': 'box_medium',
    'box_small': 'box_small',
    'logo_large': 'logo_large',
    'logo_medium': 'logo_medium',
    'logo_small': 'logo_small'
};

export default class GameService {
    constructor (config) {
        this.queue = new Queue(config.twitch_key, TWITCH_API, UNIQUE_ID, MAX_GAMES, MAX_QUEUE, INCREMENT, this.filterGameData, this.writeGamesToDB, this.getTotal);
    }

    getData (index = 0) {
        console.log('Starting Game Collection');
        return this.queue.getData();
    }

    getTotal (data) {
        return data._total;
    }

    filterGameData (data) {        
        data = data.top;
        data = _.map(data, i => _.pick(i, [
            'game',
            'channels',
            'viewers'
        ]));
        
        data = _.map(data, i => _.merge(i, i.game));
        data = _.map(data, i => {
            for(var k in i.box){
                i['box_' + k] = i.box[k];
            }

            for(var k in i.logo){
                i['logo_' + k] = i.logo[k];
            }

            return i;
        });

        return _.chain(data)
            .map(i => _.pick(i, Object.keys(GAME_KEYS)))
            .map((obj) => {
                return _.mapKeys(obj, (value, key) => {
                    return GAME_KEYS[key];
                });
            })
            .value();
    }

    writeGamesToDB (entries) {
        Game.bulkCreate(entries, {
            hooks: true,
            validate: true,
            benchmark: true,
            updateOnDuplicate:true
        });
    }
}