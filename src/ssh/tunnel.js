import tunnel from 'tunnel-ssh';
import { SERVER_CONFIG } from './private';

export default class Tunnel {
    constructor (func) {
        
        tunnel(SERVER_CONFIG, (error, server) => {
            if(error){
                console.log('SSH Connection Error:', error);
            }

            func();
        });
    }
}