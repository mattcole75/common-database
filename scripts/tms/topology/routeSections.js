// date: 2021-09-29
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the route section area section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_route_section (route_code, line_number, name, destination_stop_id) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS Route Sections...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.NetworkTopology.Lines[0].Line.forEach(line => {
                line.RouteSections[0].RouteSection.forEach(routeSection => {

                    const values = [
                        parseInt(routeSection.$.RouteCode), 
                        parseInt(line.$.LineNumber), 
                        routeSection.Description, 
                        parseInt(routeSection.Destination[0].$.Id)
                    ];
    
                    connection.query(sql, [values], (err, results, fields) => {
                        if (err)
                            console.log('err', err);
                        else
                            console.log('ok - route section:', values.join(', '), '✔');
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