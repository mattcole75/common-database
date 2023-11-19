// date: 2021-09-29
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the track section detector pair section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_track_section_detector_pair (track_section_id, entry, `exit`, association) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS TrackSection Detector Pairs...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.NetworkTopology.TrackSections[0].TrackSection.forEach(trackSection => {
                trackSection.DetectorPairs[0].DetectorPair.forEach(decPair => {

                    const values = [
                        parseInt(trackSection.$.ID), 
                        decPair.$.Entry, 
                        decPair.$.Exit, 
                        decPair.$.Association == null ? null :  decPair.$.Association
                    ];
    
                    connection.query(sql, [values], (err, results, fields) => {
                        if (err)
                            console.log('err', err);
                        else
                            console.log('ok - track section detector pair:', values.join(', '),'✔');
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