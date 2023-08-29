// date: 2021-09-28
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the stop platforms section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_platform (stop_id, platform_id, name, direction, queue_type, queue_direction, dwell_time, stabling, vt_loop) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS Platforms...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.NetworkTopology.TramStops[0].TramStop.forEach(stop => {
                stop.Platforms[0].Platform.forEach(platform => {

                    const values = [
                        parseInt(stop.$.ID), 
                        parseInt(platform.$.ID), 
                        platform.Name, 
                        platform.Direction,
                        platform.QueueType, 
                        platform.QueueDirection, 
                        parseInt(platform.DwellTime),
                        platform.Stabling == 'true', 
                        platform.VTLoop == null ? null : platform.VTLoop
                    ];
    
                    connection.query(sql, [values], (err, results, fields) => {
                        if (err)
                            console.log('err', err);
                        else
                            console.log('ok - platform:', values.join(', '), '✔');
                    }); 

                    
                })
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