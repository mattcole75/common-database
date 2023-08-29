// date: 2021-09-29
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the detector section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_detector (detector_id, equipment_number, chain_id, type, used_by, primary_controller_id, rts_enabled, critial_loop, distance) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS Detectors...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {

            result.NetworkTopology.Chainages[0].Chains[0].Chain.forEach(chain => {

                chain.Detectors[0].Detector.forEach(detector => {

                    const values = [
                        parseInt(detector.ID), 
                        detector.$.EquipmentNumber, 
                        chain.$.ID, 
                        detector.Type, 
                        detector.UsedBy, 
                        detector.PrimaryController, 
                        detector.RTSEnabled == 'false' ? false : true, 
                        detector.CriticalLoop == 'false' ? false : true,
                        parseFloat(detector.Distance)
                    ];
    
                    connection.query(sql, [values], (err, results, fields) => {
                        if (err)
                            console.log('err', err);
                        else
                            console.log('ok - detector:', values.join(', '), '✔');
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