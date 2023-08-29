// date: 2021-09-29
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the signals section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_signal (id, direction, geographical_area_id, local_controller_id, conflict_monitor_id) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS Signals...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.NetworkTopology.Signals[0].Signal.forEach(signal => {

                const values = [
                    signal.$.EquipmentNumber, 
                    signal.Direction, 
                    parseInt(signal.GeographicalArea),
                    signal.LocalController[0].$.ID, 
                    signal.ConflictMonitor[0].$.ID
                ];

                connection.query(sql, [values], (err, results, fields) => {
                    if (err)
                        console.log('err', err);
                    else
                        console.log('ok - signal:', values.join(', '), '✔');
                });
            });

            console.log('Finished: TMS Signals');
        }
    })
})
.catch(error => {
    console.log('Error in fetch: ', error);
})
.finally(() => {
    connection.end();
});