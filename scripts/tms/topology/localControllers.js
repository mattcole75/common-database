// date: 2021-09-28
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the local controllers section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS Local Controllers...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.NetworkTopology.LocalControllers[0].LocalController.forEach(lc => {

                const sql = `insert into tms_local_controller (uid, id, in_service, track_area_id, reference_ip_address, site_ip_address, port_number, description) 
                            values (${parseInt(lc.ID)}, '${lc.$.EquipmentNumber}', ${lc.InService == 'true'}, '${lc.TrackArea}',
                            INET_ATON('${lc.RefIPAddress}'), INET_ATON('${lc.SiteIPAddress}'), ${parseInt(lc.PortNumber)}, '${lc.Description}');`;

                connection.query(sql, (err, results, fields) => {
                    if (err)
                        console.log('err', err);
                    else
                        console.log('ok - local controller:', lc.Description[0], '✔');
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