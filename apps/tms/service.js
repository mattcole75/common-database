'use strict';
const database = require('./config/database');
const config = require('./config/config');
const service = config.get('service');
const express = require('./config/express');
const port = config.get('port');

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