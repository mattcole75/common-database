// date: 2021-11-12
// -> update 2023-08-29 database direct
// Engineer: Matt Cole
// Description: This script reads the transXchange timetable file and populates the core database with vehicle Journies

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;
const moment = require('moment');

const config = require('../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into txc_vehicle_journey (sequence, block, block_number, ticket_journey_code, vehicle_journey_code, service_ref, line_ref, service_journey_pattern_ref, dead_run_id, dead_run_positioning_link_id, dead_run_time, from_garage, to_stop_point_ref, departure_time) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/timetable/active.xml';

console.log('Loading: transXchange Vehicle journies...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.TransXChange.VehicleJourneys[0].VehicleJourney.forEach(journey => {

                // console.log(journey);
                const values = [
                    parseInt(journey.$.SequenceNumber),
                    journey.Operational[0].Block[0].Description[0],
                    parseInt(journey.Operational[0].Block[0].BlockNumber[0]),
                    journey.Operational[0].TicketMachine[0].JourneyCode[0],
                    journey.VehicleJourneyCode[0],
                    parseInt(journey.ServiceRef[0]),
                    journey.LineRef[0],
                    journey.JourneyPatternRef[0],
                    journey.StartDeadRun ? journey.StartDeadRun[0].$.id : null,
                    journey.StartDeadRun ? journey.StartDeadRun[0].PositioningLink[0].$.id : null,
                    journey.StartDeadRun ? parseInt(moment.duration(journey.StartDeadRun[0].PositioningLink[0].RunTime[0]).asSeconds()) : null,
                    journey.StartDeadRun ? journey.StartDeadRun[0].PositioningLink[0].From[0].GarageRef[0] : null,
                    journey.StartDeadRun ? journey.StartDeadRun[0].PositioningLink[0].To[0].StopPointRef[0] : null,
                    journey.DepartureTime[0]
                ];

                connection.query(sql, [values], (err, results, fields) => {
                    if (err)
                        console.log('err', err);
                    else
                        console.log('ok - vehicle journey:', values.join(', '), '✔');
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