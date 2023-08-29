// const Loop = require('./subclass/loop');
const Tail = require('tail').Tail;
const logEntry = require('../scripts/logEntry');
const axios = require('../../../shared/axios');
const config = require('../../../config/config');
const idToken = config.get('idToken');
const moment = require('moment');

class LoopMonIO {

    constructor (area, path) {
        this.area = area;
        this.path = path;
        this.tail = new Tail(this.path);
        this.msg = null;
    };

    start = () => {
        
        //output what is being monitored
        console.log('Monitoring for loop activity');
        
        this.tail.on('line', (line) => {
            this.msg = { ... logEntry(line), area: this.area };

            // console.log(this.msg);

            // const postPointState = (data) => {

            //     axios.post('/pointdata', data, {
            //         headers: {
            //             "Content-Type": "application/json",
            //             idToken: idToken
            //         }
            //     })
            //     .then(res => {
            //         // console.log('ok - ', data);
            //     })
            //     .catch(err => {
            //        console.log('error - ', err.message);
            //     });
            // }

            // const postPointTimings = (data) => {
            //     axios.post('/sensordata', data, {
            //         headers: {
            //             "Content-Type": "application/json",
            //             idToken: idToken
            //         }
            //     })
            //     .then(res => {
            //         // console.log('ok - ', data);
            //     })
            //     .catch(err => {
            //        console.log('error - ', err.message);
            //     })
            //     .finally(() => {
            //         // reset lets after after points drive and swing
            //         driveStart = null;
            //         driveEnd = null;
            //         driveTime = null;
            //         swingStart = null;
            //         swingEnd = null;
            //         swingTime = null;
            //     });
            // }

            // console.log(this.msg);
            
            if(this.msg.system === 'loop') {
                console.log(this.msg);
            }       
        })
    };
}

module.exports = LoopMonIO;