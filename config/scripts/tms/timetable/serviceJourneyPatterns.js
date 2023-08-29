// date: 2021-11-01
// -> update 2023-08-29 database direct
// Engineer: Matt Cole
// Description: This script reads the transXchange timetable file and populates the core database with service journey pattern

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into txc_service_journey_pattern (service_code, journey_pattern_id, direction, route_ref, journey_pattern_section_ref) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/timetable/active.xml';

console.log('Loading: transXchange Services Journey Patterns...');

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
                service.StandardService[0].JourneyPattern.forEach(JourneyPattern => {

                    const values = [
                        parseInt(service.ServiceCode[0]),
                        JourneyPattern.$.id,
                        JourneyPattern.Direction[0],
                        JourneyPattern.RouteRef[0],
                        JourneyPattern.JourneyPatternSectionRefs[0]
                    ];
    
                    connection.query(sql, [values], (err, results, fields) => {
                        if (err)
                            console.log('err', err);
                        else
                            console.log('ok - service journey pattern:', values.join(', '), '✔');
                    });
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