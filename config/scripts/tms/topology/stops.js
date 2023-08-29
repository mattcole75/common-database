// date: 2021-09-28
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the stops section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_stop (id, atco_code, name, short_name, tla, terminus, layover_time, geographical_area_id, local_controller_id, type, preferred_platform) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS Stops...');

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

                const values = [
                    parseInt(stop.$.ID), 
                    stop.AtcoCode, 
                    stop.Name[0].$.Value, 
                    stop.ShortName[0].$.Value, 
                    stop.TLA,
                    stop.Terminus[0].$.Value == 'true', 
                    parseInt(stop.LayoverTime), 
                    parseInt(stop.GeographicalArea),
                    stop.LocalController, 
                    stop.Type, 
                    stop.PreferredPlatform
                ];

                connection.query(sql, [values], (err, results, fields) => {
                    if (err)
                        console.log('err', err);
                    else
                        console.log('ok - stop:', values.join(', '), '✔');
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