import Sequelize from 'sequelize';
import Stream from 'DATABASE/stream_data/models/Stream';

export default class StreamRoute {
    constructor (app) {
        this.app = app;
        this.init();
    }

    init () {
        this.app.get('/stream', this.requestHandler);
    }

    requestHandler (req, res){
        Stream
            .find({
                order: [
                    Sequelize.fn( 'RAND' ),
                ]
            })
            .then(results => {
                return Stream.find({
                    where: {
                        id: results.streamId
                    }
                });
            })
            .then(results => res.send(JSON.stringify(results)));
    }
}