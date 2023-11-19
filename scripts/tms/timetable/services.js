// date: 2021-11-07
// -> update 2023-08-29 database direct
// Engineer: Matt Cole
// Description: This script reads the transXchange timetable file and populates the core database with services

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;
const moment = require('moment');

const config = require('../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into txc_service (code, line_id, line_ref, start_date, operator_ref, direction, origin, destination) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/timetable/active.xml';

console.log('Loading: transXchange Services...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.TransXChange.Services[0].Service.forEach(service => {

                const values = [
                    parseInt(service.ServiceCode[0]),
                    service.Lines[0].Line[0].$.id,
                    parseInt(service.Lines[0].Line[0].LineName[0]),
                    moment().format('YYYY-MM-DD'),
                    service.RegisteredOperatorRef[0],
                    service.Direction[0],
                    service.StandardService[0].Origin[0],
                    service.StandardService[0].Destination[0]
                ];

                connection.query(sql, [values], (err, results, fields) => {
                    if (err)
                        console.log('err', err);
                    else
                        console.log('ok - service:', values.join(', '), '✔');
                });

            });
        }
    })
})
.catch(error => {
    console.log('Error in fetch: ', error);
})
.finally(() => {
    console.log('Finished: transXchange Services');
})
.finally(() => {
    connection.end();
});