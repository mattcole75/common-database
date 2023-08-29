'use strict';
const database = require('./configuration/database');
const config = require('./configuration/config');
const service = config.get('service');
const port = config.get('port');
const express = require('./configuration/express');

const app = express();

database.connectToServer((err) => {
    if (err) {
        console.error(err);
        process.exit();
    } else {
        app.listen(port, () => {
            console.log(service + ` api is running on port: ${port}`);
        });
    }
});