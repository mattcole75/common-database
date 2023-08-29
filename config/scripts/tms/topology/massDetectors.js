// date: 2021-09-28
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the mass detector section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_mass_detector (id, local_controller_id, conflict_monitor_id, associated_spas_zone_id) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS Mass Detectors...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.NetworkTopology.MassDetectors[0].MassDetector.forEach(massdet => {

                const values = [
                    massdet.$.ID, 
                    massdet.LocalController[0].$.ID, 
                    massdet.ConflictMonitor === undefined ? null : massdet.ConflictMonitor[0].$.ID, 
                    massdet.AssociatedSPAS === undefined ? null : massdet.AssociatedSPAS[0].$.Zone
                ];

                connection.query(sql, [values], (err, results, fields) => {
                    if (err)
                        console.log('err', err);
                    else
                        console.log('ok - mass detector:', values.join(', '), '✔');
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