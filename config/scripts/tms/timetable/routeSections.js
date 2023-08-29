// date: 2021-11-04
// -> update 2023-08-29 database direct
// Engineer: Matt Cole
// Description: This script reads the transXchange timetable file and populates the core database with route sections

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into txc_route_section (id, route_link_id, from_stop_point_ref, to_stop_point_ref, direction) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/timetable/active.xml';

console.log('Loading: transXchange Route Sections...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.TransXChange.RouteSections[0].RouteSection.forEach(routeSection => {

                routeSection.RouteLink.forEach(routeLink => { 

                    const values = [
                        routeSection.$.id,
                        routeLink.$.id,
                        routeLink.From[0].StopPointRef[0],
                        routeLink.To[0].StopPointRef[0],
                        routeLink.Direction[0]
                    ];

                    connection.query(sql, [values], (err, results, fields) => {
                        if (err)
                            console.log('err', err);
                        else
                            console.log('ok - route section:', values.join(', '), '✔');
                    });
                });
            });

            console.log('Finished: transXchange Route Sections');
        }
    })
})
.catch(error => {
    console.log('Error in fetch: ', error);
})
.finally(() => {
    connection.end();
});