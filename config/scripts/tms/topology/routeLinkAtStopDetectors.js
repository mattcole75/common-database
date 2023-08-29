// date: 2021-09-28
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the route link at stop detectors section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_route_link_detector_at_stop (route_link_id, detector, platform_id, trigger_association) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS At Stop Detectors...');

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
                
                if(routeLink.FromTramStop[0].AtStopTriggers) {
                    routeLink.FromTramStop[0].AtStopTriggers[0].AtStopTrigger.forEach(atStopTrigger => {

                        const values = [
                            routeLink.$.ID, 
                            atStopTrigger.$.Detector, 
                            parseInt(atStopTrigger.$.Platform), 
                            atStopTrigger.$.TriggerAssociation
                        ];
        
                        connection.query(sql, [values], (err, results, fields) => {
                            if (err)
                                console.log('err', err);
                            else
                                console.log('ok - route link at stop detector:', values.join(', '), '✔');
                        });
                    })
                }
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