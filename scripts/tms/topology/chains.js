// date: 2021-09-28
// -> update 2023-08-19 database direct
// Engneer: Matt Cole
// Description: This script inserts the chains area section into the database

const config = require('../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

connection.connect();

console.log('Loading: TMS Chains...');

    const sql = `insert into tms_chain (id, name, direction) values 
    ('EC1', 'Eccles Line Chainage 1 (Outbound Track)', 'Outbound'),
    ('EC2', 'Eccles Line Chainage 2 (Inbound Track)', 'Inbound'),
    ('MC3', 'Media City Delta Chainage', null),
    ('AL1', 'Altrincham Line Chainage (Outbound Track)', 'Outbound'),
    ('AL2', 'Altrincham Line Chainage (Inbound Track)', 'Inbound'),
    ('DC1', 'Deansgate-Castlefield Centre Platform', null),
    ('SM1', 'South Manchester Line (Outbound Track) to St Werberghs Road', 'Outbound'),
    ('SM2', 'South Manchester Line (Inbound Track) from St Werberghs Road', 'Inbound'),
    ('BR1', 'Bury Line (Outbound Track) from Delta MKT16M', 'Outbound'),
    ('BR2', 'Bury Line (Inbound Track) to Delta MKT10J', 'Inbound'),
    ('DM1', 'Dummy Chain for VT Implementation', null),
    ('EM1', 'East Manchester Line (Outbound Track) from Delta MKT16M', 'Outbound'),
    ('EM2', 'East Manchester Line (Inbound Track) Measured to Delta MKT10J', 'Inbound'),
    ('RO1', 'Rochdale/Oldham Line (Outbound Track) from IRK09M', 'Outbound'),
    ('RO2', 'Rochdale/Oldham Line (Inbound Track) to IRK02M', 'Inbound'),
    ('NH1', 'Newton Heath & Moston Single Line', null),
    ('NB1', 'Newbold Single Line', null),
    ('AP1', 'Airport Line (Outbound Track)', 'Outbound'),
    ('AP2', 'Airport Line (Inbound Track', 'Inbound'),
    ('CC1', '2CC (Outbound Track)', 'Outbound Track'),
    ('CC2', '2CC (Inbound Track)', 'Inbound Track'),
    ('TP1', 'Trafford Park Line (Outbound Track', 'Outbound'),
    ('TP2', 'Trafford Park Line (Inbound Track)', 'Inbound')`;

    connection.query(sql, (err, results, fields) => {
        if (err)
            console.log('err', err);
        else
            console.log('ok - chains added to database', '✔');
    }); 


    connection.end();