const moment = require('moment');

const postSensorMonitoringPointSchema = {
    name: value => value.length > 3 && value.length <= 64,
    area: value => value.length > 3 && value.length <=64
    // location: // future test json is valid
}

const patchSensorMonitoringPointSchema = {
    name: value => value.length > 3 && value.length <= 64,
    area: value => value.length > 3 && value.length <=64
    // location: // future test json is valid
}

const postSensorSchema = {
    sensor_monitoring_point_ref: value => parseInt(value) === Number(value),
    // prev_id_ref: value => value.length > 0 && value.length <= 64,
    name: value => value.length > 0 && value.length <= 64,
    department: value => value.length > 0 && value.length <= 64,
    system: value => value.length > 0 && value.length <= 64,
    type: value => value.length > 0 && value.length <= 64,
    purpose: value => value.length > 0 && value.length <= 256,
    // upper_threshold
    // lower_threshold
    // calibration_date
    // calibration_valid_weeks
    // calibration_cert_url
    // installed_date
    // commissioned_date
    // uninstalled_date
    status: value => value.length > 0 && value.length <= 256
};

const patchSensorSchema = {
    id: value => parseInt(value) === Number(value),
    sensor_monitoring_point_ref: value => parseInt(value) === Number(value),
    // prev_id_ref: value => value.length > 0 && value.length <= 64,
    name: value => value.length > 0 && value.length <= 64,
    department: value => value.length > 0 && value.length <= 64,
    system: value => value.length > 0 && value.length <= 64,
    type: value => value.length > 0 && value.length <= 64,
    purpose: value => value.length > 0 && value.length <= 256,
    // upper_threshold
    // lower_threshold
    // calibration_date
    // calibration_valid_weeks
    // calibration_cert_url
    // installed_date
    // commissioned_date
    // uninstalled_date
    status: value => value.length > 0 && value.length <= 256
};

module.exports = {
    postSensorMonitoringPointSchema: postSensorMonitoringPointSchema,
    patchSensorMonitoringPointSchema: patchSensorMonitoringPointSchema,
    postSensorSchema: postSensorSchema,
    patchSensorSchema: patchSensorSchema
}