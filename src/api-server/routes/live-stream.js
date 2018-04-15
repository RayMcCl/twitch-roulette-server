import Sequelize from 'sequelize';
import cors from 'cors';
import LiveStream from 'DATABASE/stream_data/models/LiveStream';
import Stream from 'DATABASE/stream_data/models/Stream';

const LIMIT_MAX = 100;

export default class LiveStreamRoute {
    constructor (app) {
        this.app = app;
        this.init();

        this.QUERY_FILTER = {
            'random': this.queryRandom,
            'limit': this.queryLimit,
            'offset': this.queryOffset
        };
    }

    init () {
        this.app.get('/live-stream', cors(), this.requestHandler.bind(this));
    }

    requestHandler (req, res){
        var filters = {
            order: [
                [Stream, 'followers', 'DESC']
            ],
            limit: 10
        };

        Object.assign(filters, this.queryHandler(req.query));

        LiveStream
            .findAll({
                include: [
                    {
                        model: Stream, 
                        required: true
                    }
                ],
                ...filters
            })
            .then(results => res.send(JSON.stringify(results.map(obj => obj.stream))));
    }

    queryHandler (query) {
        var r = {};

        for(var k in query){
            if(this.QUERY_FILTER.hasOwnProperty(k)){
                let queryValue = this.QUERY_FILTER[k](query[k]);

                if(queryValue){
                    r = Object.assign({}, r, queryValue);
                }
            }
        }
        return r;
    }

    queryRandom () {
        return {
            order: [
                Sequelize.fn( 'RAND' ),
            ]
        };
    }

    queryLimit (val) {
        val = val < LIMIT_MAX ? val : LIMIT_MAX;

        return {
            limit: parseInt(val)
        };
    }

    queryOffset (val) {
        return {
            offset: parseInt(val)
        };
    }
}
