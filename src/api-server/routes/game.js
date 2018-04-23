/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name game.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Sunday, 22nd April 2018 6:01:10 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import Sequelize from 'sequelize';
import Game from 'DATABASE/stream_data/models/Game';

export default class GameRoute {
    constructor (app) {
        this.app = app;
        this.init();
    }

    init () {
        this.app.get('/game', this.requestHandler);
    }

    requestHandler (req, res){
        Game
            .find({
                order: [
                    [Game, 'viewers', 'DESC']
                ],
                limit: 100
            })
            .then(results => res.send(JSON.stringify(results)));
    }
}