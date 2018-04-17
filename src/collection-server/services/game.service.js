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

export default class GameService {
    constructor (config) {
        this.axios = axios.create({
            headers: {
                'Client-ID': config.twitch_key
            }
        });
    }

    getGames () {

    }

    filterGameData (data) {

    }

    writeGamesToDB (entry) {
        
    }
}