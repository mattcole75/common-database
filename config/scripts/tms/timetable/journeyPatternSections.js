// date: 2021-11-03
// -> update 2023-08-29 database direct
// Engineer: Matt Cole
// Description: This script reads the transXchange timetable file and populates the core database with Journey Pattern Sections

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;
const moment = require('moment');

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into txc_journey_pattern_section (id, timing_link_id, from_id, from_sequence_number, from_stop_point_ref, from_timing_status, to_id, to_sequence_number, to_stop_point_ref, to_timing_status, route_link_ref, run_time) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/timetable/active.xml';

let journeyPatternSectionRef = null;
let journeyPatternSection = [];

const sorter = (a, b) => {
    return +a.ref.match(/\d+/)[0] - +b.ref.match(/\d+/)[0];
}

console.log('Loading: transXchange Journey Pattern Sections...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.TransXChange.JourneyPatternSections[0].JourneyPatternSection.forEach(jps => {
                journeyPatternSectionRef = jps.$.id
                jps.JourneyPatternTimingLink.forEach(jptl => {

                    journeyPatternSection.push({
                        ref: jps.$.id,
                        timingLinkId: jptl.$.id,
                        from: {
                            id: jptl.From[0].$.id,
                            sequenceNumber: parseInt(jptl.From[0].$.SequenceNumber),
                            stopPointRef: jptl.From[0].StopPointRef[0],
                            timingStatus: jptl.From[0].TimingStatus[0]
                        },
                        to: {
                            id: jptl.To[0].$.id,
                            sequenceNumber: parseInt(jptl.To[0].$.SequenceNumber),
                            stopPointRef: jptl.To[0].StopPointRef[0],
                            timingStatus: jptl.To[0].TimingStatus[0]
                        }, 
                        routeLinkRef: jptl.RouteLinkRef[0],
                        runtime: moment.duration(jptl.RunTime[0]).asSeconds()
                    });
                });
                
                journeyPatternSection.sort(sorter);

                const values = [
                    journeyPatternSection[0].ref,
                    journeyPatternSection[0].timingLinkId,
                    journeyPatternSection[0].from.id,
                    journeyPatternSection[0].from.sequenceNumber,
                    journeyPatternSection[0].from.stopPointRef,
                    journeyPatternSection[0].from.timingStatus,
                    journeyPatternSection[0].to.id,
                    journeyPatternSection[0].to.sequenceNumber,
                    journeyPatternSection[0].to.stopPointRef,
                    journeyPatternSection[0].to.timingStatus,
                    journeyPatternSection[0].routeLinkRef,
                    journeyPatternSection[0].runtime
                ];

                connection.query(sql, [values], (err, results, fields) => {
                    if (err)
                        console.log('err', err);
                    else
                        console.log('ok - journey pattern section:', values.join(', '), '✔');
                });

                journeyPatternSection = [];
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