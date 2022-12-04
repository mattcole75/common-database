const Signal = require('./subclass/signal');
const Tail = require('tail').Tail;
const logEntry = require('../../shared/logEntry');
const axios = require('../../shared/axios');
const config = require('../../config/config');
const idToken = config.get('idToken');
const moment = require('moment');

class PointMonIO {

    constructor (id, name, area, path, IO) {
        this.id = id;
        this.name = name;
        this.area = area;
        this.path = path;
        this.IO = IO;
        this.tail = new Tail(this.path);
        this.msg = null;
    }

    start = () => {

        // local array specifying what IO to monitor.
        let ioMonitorFor = [];
        this.IO.forEach(sig => {
            let signal = new Signal(this.id, this.name, sig.system, sig.signal, sig.ioType, sig.channel, sig.relay, sig.relayType, sig.key, sig.on, sig.off, null, null);
            ioMonitorFor.push(signal);
        });

        // declare local variable
        let direction = null;
        let driveStart = null;
        let driveEnd = null;
        let driveTime = null;
        let swingStart = null;
        let swingEnd = null;
        let swingTime = null;

        //specifiy date for testing this is to be deleted
        let logDate = '2022-11-14';
        
        //output what is being monitored
        console.log('Monitoring for', ioMonitorFor);
        
        this.tail.on('line', (line) => {
            this.msg = logEntry(line);

            // console.log(this.msg);

            const postPointState = (data) => {

                axios.post('/pointdata', data, {
                    headers: {
                        "Content-Type": "application/json",
                        idToken: idToken
                    }
                })
                .then(res => {
                    // console.log('ok - ', data);
                })
                .catch(err => {
                   console.log('error - ', err.message);
                });
            }

            const postPointTimings = (data) => {
                axios.post('/sensordata', data, {
                    headers: {
                        "Content-Type": "application/json",
                        idToken: idToken
                    }
                })
                .then(res => {
                    // console.log('ok - ', data);
                })
                .catch(err => {
                   console.log('error - ', err.message);
                })
                .finally(() => {
                    // reset lets after after points drive and swing
                    driveStart = null;
                    driveEnd = null;
                    driveTime = null;
                    swingStart = null;
                    swingEnd = null;
                    swingTime = null;
                });
            }

            if(this.msg.system === 'dig') {

                // if exists find reference signal array index
                let index = ioMonitorFor.findIndex(
                    cls => cls.ioType === (this.msg.output === true ? 'output' : this.msg.input === true ? 'input' : null)
                        && cls.key === this.msg.key
                );                
                // if reference signal exists
                if(index !== -1){
                    // update local event datetime
                    ioMonitorFor[index].setState(this.msg.state);
                    ioMonitorFor[index].setEventTimestamp(moment(new Date(logDate + ' ' + this.msg.eventTimestamp).toISOString(), 'YYYY-MM-DD HH:mm:ss:SSS'));
                    // ioMonitorFor[index].setEventTimestamp(moment((logDate + ' ' + this.msg.eventTimestamp)).format('YYYY-MM-DD HH:mm:ss:SSS'));
                    // ioMonitorFor[index].setEventTimestamp(moment((logDate + ' ' + this.msg.eventTimestamp), 'YYYY-MM-DD HH:mm:ss:SSS').format('YYYY-MM-DD HH:mm:ss:SSS'));
                    


                    // debugging console output
                    console.log(this.name,
                        ioMonitorFor[index].state === 'on'
                            ? ioMonitorFor[index].onState
                            :   ioMonitorFor[index].state === 'off'
                                ? ioMonitorFor[index].offState
                                : 'ukn'
                    )
                    
                    // check for drive and swing times
                    if(ioMonitorFor[index].signal === 'Point Set Right' || ioMonitorFor[index].signal === 'Point Set Left') {

                        direction = ioMonitorFor[index].signal;

                        if(ioMonitorFor[index].ioType === 'output' && ioMonitorFor[index].state === 'on') {
                            driveStart = ioMonitorFor[index].eventTimestamp;
                            // driveStart = moment(ioMonitorFor[index].eventTimestamp, "HH:mm:ss:SSS");
                        }

                        if(ioMonitorFor[index].ioType === 'output' && ioMonitorFor[index].state === 'off') {
                            driveEnd = ioMonitorFor[index].eventTimestamp;
                            // driveEnd = moment(ioMonitorFor[index].eventTimestamp, "HH:mm:ss:SSS");

                            if(driveStart !== null) {
                                driveTime = moment(driveEnd).diff(moment(driveStart), 'milliseconds');
                                console.log('Drive Time', driveTime);
                                
                                if(swingTime !== null && driveTime !== null) {
                                    postPointTimings({
                                        id: this.id,
                                        direction: direction,
                                        swingTime: swingTime,
                                        driveTime: driveTime,
                                        eventTimestamp: swingStart
                                    });
                                }
                            }
                        }

                        if(ioMonitorFor[index].ioType === 'input' && ioMonitorFor[index].state === 'off') {
                            swingStart = ioMonitorFor[index].eventTimestamp;
                            // swingStart = moment(ioMonitorFor[index].eventTimestamp, "HH:mm:ss:SSS");
                        }

                        if(ioMonitorFor[index].ioType === 'input' && ioMonitorFor[index].state === 'on') {
                            swingEnd = ioMonitorFor[index].eventTimestamp;
                            // swingEnd = moment(ioMonitorFor[index].eventTimestamp, "HH:mm:ss:SSS");

                            if(swingStart !== null) {
                                swingTime = moment(swingEnd).diff(moment(swingStart), 'milliseconds');
                                console.log('Swing Time', swingTime);
                            }
                        }
                    }
                    
                    // post IO state change to timeseries db
                    postPointState(ioMonitorFor[index].signalState());

                    // console.log('Event', ioMonitorFor[index].signalState());
                }
            }       
        })
    };
}

module.exports = PointMonIO;