// date: 2021-11-01
// -> update 2023-08-29 database direct
// Engineer: Matt Cole
// Description: This script reads the transXchange timetable file and populates the core database with stops

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into txc_stop (stop_point_ref, common_name, tla) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/timetable/active.xml';

console.log('Loading: transXchange Stops...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.TransXChange.StopPoints[0].AnnotatedStopPointRef.forEach(stop => {

                const values = [
                        stop.StopPointRef[0],
                        stop.CommonName[0],
                        stop.StopPointRef[0].substr(stop.StopPointRef[0].length - 3)
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