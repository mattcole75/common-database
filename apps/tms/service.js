'use strict';
const dotenv = require('dotenv').config();
const database = require('./config/database');
const config = require('./config/config');
const service = config.get('service');
const express = require('./config/express');

const port = 1338;

if(dotenv.error) {
    console.log(dotenv.error);
    process.exit(1);
}

const app = express();

database.connect(error => {
    if(error) {
      console.log('Database connection failed: ', error);
      process.exit(1);
    }
    else {
        app.listen(port, () => {
            console.log(service + ' service is running on port: ' + port);
        });
    }
});