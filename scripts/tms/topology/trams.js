// date: 2021-09-28
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the tram section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS Tram Area...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.NetworkTopology.Trams[0].Tram.forEach(tram => {

                const sql = `insert into tms_tram (id, reference_ip_address, site_ip_address, status)
                values (${parseInt(tram.$.FleetNumber)}, INET_ATON('${tram.RefIPAddress[0]}'), INET_ATON('${tram.SiteIPAddress[0]}'), '${tram.Type[0]}');`;

                connection.query(sql, (err, results, fields) => {
                    if (err)
                        console.log('err', err);
                    else
                        console.log('ok - tram:', tram.$.FleetNumber, '✔');
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