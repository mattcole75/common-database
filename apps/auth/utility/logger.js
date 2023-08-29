"use strict";
const bunyan = require('bunyan');
const config = require('../configuration/config');

const createLogger = () => {

    const logger = bunyan.createLogger({
        name: config.get('service'),
        streams: [{
            path: config.get('logPath'),
        }]
    });

    return logger;
};

module.exports = createLogger;