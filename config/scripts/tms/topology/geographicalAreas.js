// date: 2021-09-29
// -> update 2023-08-19 database direct
// Developer: Matt Cole
// Description: This script reads the tms topology file and inserts the geographical area section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_geographical_area (id, network_section_name, name) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';


console.log('Loading: TMS Geographical Areas...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {

            result.NetworkTopology.NetworkSections[0].NetworkSection.forEach(networkSection => {
                networkSection.GeographicalAreas[0].GeographicalArea.forEach(geoArea => {

                    const values = [
                        parseInt(geoArea.$.ID),
                        networkSection.$.Name, 
                        geoArea.Name
                    ];
    
                    connection.query(sql, [values], (err, results, fields) => {
                        if (err)
                            console.log('err', err);
                        else
                            console.log('ok - geographical area:', values.join(', '), '✔');
                    });
                });
            });
        }
    });
})
.catch(error => {
    console.log('Error in fetch: ', error);
})
.finally(() => {
    connection.end();
});