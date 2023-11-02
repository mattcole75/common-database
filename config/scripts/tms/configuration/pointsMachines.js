// date: 2023-10-11
// Engineer: Matt Cole
// Description: This script reads the point machine configuration file and inserts into the configurationsection tables of the database

const pointsMachines = require('../../../data/pointMachines.json');

const config = require('../../../database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into config_points_machine (id, points_controller_ref, direction, switch_type, rail_type, track_form, maintenance_guage, free_wheel_clearance, free_wheel_passage, open_switch, machine_type, points_configuration, points_position_indicator_present, points_position_indicator_shows_left, points_position_indicator_shows_right, points_barable, points_handle_present, hand_operated_by_driver, trailable_5mph, operation_restrictions, operation_procedure, swing_time_safety_limit, motor_drive_timeout, notes) values (?)';

connection.connect();

console.log('Loading: Points Machine Config...');

pointsMachines.forEach(element => {

    const values = [
        element.id,
        element.controller,
        element.direction,
        element.switch_type ? element.switch_type : 'Unknown',
        element.rail_type ? element.rail_type : 'Unknown',
        element.track_form ? element.track_form : 'Unknown',
        element.mtg,
        element.fwc,
        element.fwp,
        element.os,
        element.machine_type,
        element.points_configuration ? element.points_configuration : 'Unknown',
        element.ppi ? 'Yes' : 'No',
        element.left ? 'Yes' : 'No',
        element.right ? 'Yes' : 'No',
        element.bar ? 'Yes' : 'No',
        element.points_handle ? element.points_handle : 'Unknown',
        element.hand_operated_by_driver ? 'Yes' : 'No',
        element.trailable_5mph ? 'Yes' : 'No',
        element.operational_restrictions,
        element.operation_procedure,
        element.swing_time_safety_limit,
        element.motor_drive_timeout,
        element.comments
    ];

    connection.query(sql, [values], (err, results, fields) => {
        if (err)
            console.log('err', err);
        else
            console.log('ok - points mmachine:', values.join(', '), '✔');
    });
});

connection.end();