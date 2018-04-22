/**
 * Copyright 2018
 * www.raymccl.com
 * 
 * @name api_queue.js
 * @author Ray McClain
 * @desc 
 * 
 * Last Modified: Sunday, 22nd April 2018 5:39:56 pm
 * Modified By: Ray McClain (reibmc@gmail.com>)
 */

import axios from 'axios';

var fs = require('fs');

export default class APIQueue {
    constructor (apiKey, apiEndpoint, uniqueId, maxData, maxQueue, increment, filter, write, totalSelector) {
        this.axios = axios.create({
            headers: {
                'Client-ID': apiKey
            }
        });
        this.apiEndpoint = apiEndpoint;
        this.uniqueId = uniqueId;
        this.maxData = maxData;
        this.maxQueue = maxQueue;
        this.increment = increment;
        this.filter = filter;
        this.write = write;
        this.totalSelector = totalSelector;
        this.queue = [];
        this.queueIds = [];
    }

    getData () {
        return new Promise((resolve, reject) => {
            this.requestData(0, resolve);
        });
    }

    requestData (index, resolve) {
        console.log('Index', index);
        this.axios
            .get(this.apiEndpoint, {
                params: {
                    offset: index,
                    limit: this.increment
                }
            })
            .then((res) => {
                if(this.handleData(res, index)){
                    resolve();
                } else {
                    this.requestData(index + this.increment, resolve);
                }              
            })
            .catch(error => {
                console.log(error);  
                resolve();
            });
    }

    handleData (res, index) {
        const data = res.data;
        const total = this.getTotalData(data);

        let filtered = this.filterData(data);

        filtered = filtered.filter((obj) => this.queueIds.indexOf(obj[this.uniqueId]) === -1);

        filtered.map((obj) => {
            this.queueIds.push(obj[this.uniqueId]);
            return obj;
        });

        this.queue = this.queue.concat(filtered);

        // console.log(data);

        if(total > filtered.length + index && this.maxData > filtered.length + index){
            if(this.queue.length > this.maxQueue) {
                this.writeData(this.queue);
                this.queue = [];
                this.queueIds = [];
            }
            return false;
        } else {
            console.log('Finished Collection');
            return true;
        }
    }

    getTotalData (data) {
        return this.totalSelector(data);
    }

    filterData (data) {
        return this.filter(data);
    }

    writeData (data) {
        fs.writeFile('test', JSON.stringify(data));
        return this.write(data);
    }
}