// date: 2021-11-01
// -> update 2023-08-29 database direct
// Engineer: Matt Cole
// Description: This script reads the transXchange timetable file and populates the core database with garages

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into txc_garage (code, operator_id, name) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/timetable/active.xml';

console.log('Loading: transXchange Garages...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.TransXChange.Operators[0].Operator.forEach(operator => {
                operator.Garages[0].Garage.forEach(garage => {

                    const values = [
                            garage.GarageCode[0],
                            operator.$.id,
                            garage.GarageName[0]
                    ];
    
                    connection.query(sql, [values], (err, results, fields) => {
                        if (err)
                            console.log('err', err);
                        else
                            console.log('ok - garage:', values.join(', '), '✔');
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