// date: 2021-09-29
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the route section link area section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_route_section_link (id, route_code, line_number, sequence) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS Route Section Links...');

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

                let sequence = 0;

                line.RouteSections[0].RouteSection.forEach(routeSection => {

                    routeSection.RouteSectionLinks[0].RouteSectionLink.forEach(routeSectionLink => {

                        sequence ++;

                        const values = [
                            routeSectionLink.$.ID, 
                            parseInt(routeSection.$.RouteCode), 
                            parseInt(line.$.LineNumber), 
                            sequence
                        ];
        
                        connection.query(sql, [values], (err, results, fields) => {
                            if (err)
                                console.log('err', err);
                            else
                                console.log('ok - route section link:', values.join(', '), '✔');
                        });
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