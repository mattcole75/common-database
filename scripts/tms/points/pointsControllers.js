// date: 2023-10-11
// Engineer: Matt Cole
// Description: This script reads the points controller configuration file and inserts to the configurationsection of the database

const pointsControllers = require('../data/pointsControllers.json');

const config = require('../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into config_points_controller (id, type, modification_description, comms_type, plc_serial_number, plc_firmware_version, comments) values (?)';

connection.connect();

console.log('Loading: Point Controller Config...');

pointsControllers.forEach(element => {
    const values = [
        element.id,
        element.type,
        element.modification_description,
        element.comms_type ? element.comms_type : 'Unknown',
        element.plc_serial_number ? element.plc_serial_number : 'Unknown',
        element.plc_firmware_version ? element.plc_firmware_version : 'Unknown',
        element.comments
    ];

    connection.query(sql, [values], (err, results, fields) => {
        if (err)
            console.log('err', err);
        else
            console.log('ok - points controller:', values.join(', '), '✔');
    });
});

connection.end();