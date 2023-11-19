// date: 2021-11-03
// -> update 2023-08-29 database direct
// Engineer: Matt Cole
// Developer: Matt Cole
// Description: This script reads the transXchange timetable file and populates the core database with routes

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into txc_route (id, private_code, description, route_section_ref, line_number, route_code) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/timetable/active.xml';

console.log('Loading: transXchange Routes...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.TransXChange.Routes[0].Route.forEach(route => {

                const values = [
                    route.$.id,
                    route.PrivateCode[0],
                    route.Description[0],
                    route.RouteSectionRef[0],
                    parseInt(route.PrivateCode[0].slice(0, 1)),
                    parseInt(route.PrivateCode[0].slice(1))
                ];

                connection.query(sql, [values], (err, results, fields) => {
                    if (err)
                        console.log('err', err);
                    else
                        console.log('ok - route:', values.join(', '), '✔');
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