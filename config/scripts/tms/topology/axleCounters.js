// date: 2021-09-28
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the axle counter section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_axle_counter (id, type, associated_spas_zone_id, local_controller_id, conflict_monitor_id) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS Axle Counters...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.NetworkTopology.AxleCounters[0].AxleCounter.forEach(axleCounter => {

                const values = [
                    axleCounter.$.ID, 
                    axleCounter.Type, 
                    axleCounter.AssociatedSPAS === undefined ? null : axleCounter.AssociatedSPAS[0].$.Zone, 
                    axleCounter.LocalController[0].$.ID, 
                    axleCounter.ConflictMonitor === undefined ? null : axleCounter.ConflictMonitor[0].$.ID
                ];

                connection.query(sql, [values], (err, results, fields) => {
                    if (err)
                        console.log('err', err);
                    else
                        console.log('ok - axle counter:', values.join(', '), '✔');
                });                
            });
        }
    })
})
.catch(error => {
    console.log('Error in fetch: ', error);
})
.finally(() => {
    connection.end();
});