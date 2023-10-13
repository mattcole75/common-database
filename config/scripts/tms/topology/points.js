// date: 2021-09-29
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the points section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_points_machine (id, type, direction, normal_position, normal_position_timeout, route_blocking_disabled, teml_41, local_controller_id) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS Points Machines...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.NetworkTopology.Points[0].Point.forEach(point => {

                const values = [
                    point.$.EquipmentNumber, 
                    point.Type, 
                    point.Direction, 
                    point.NormalPosition, 
                    parseInt(point.NormalPositionTimeout),
                    point.RouteBlockingDisabled === undefined ? false : true,
                    point.TEML41 === undefined ? false : true, 
                    point.LocalController[0].$.ID
                ];

                connection.query(sql, [values], (err, results, fields) => {
                    if (err)
                        console.log('err', err);
                    else
                        console.log('ok - points machine:', values.join(', '), '✔');
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