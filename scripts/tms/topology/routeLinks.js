// date: 2021-09-28
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the route link section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_route_link (id, direction, transit_time, from_stop_id, to_stop_id) values (?) on duplicate key update id=id;';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS Route Links...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.NetworkTopology.RouteLinks[0].RouteLink.forEach(routeLink => {

                const values = [
                    routeLink.$.ID,
                    routeLink.Direction,
                    parseInt(routeLink.TransitTime),
                    parseInt(routeLink.FromTramStop[0].$.ID),
                    parseInt(routeLink.ToTramStop[0].$.ID)
                ];

                connection.query(sql, [values], (err, results, fields) => {
                    if (err)
                        console.log('err', err);
                    else
                        console.log('ok - route link:', values.join(', '), '✔');
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