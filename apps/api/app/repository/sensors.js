const database = require('../../config/database');

const postSensorMonitoringPoint = (req, next) => {
    
    const { name, area } = req;
    const sproc = `call sp_insert_sensor_monitoring_point('${name}', '${area}', @insertId);`;

    database.getPool().query(sproc, (err, res) => {
        if(err) {
            if(err.code === 'ER_DUP_ENTRY')
                next({ status: 409, msg: err }, null);
            else
                next({ status: 500, msg: err }, null);
        }
        else
            next(null, { status: 201, data: res });
    });
};

const getSensorMonitoringPoints = (req, next) => {
    const { params } = req;
    const sproc = `call sp_select_sensor_monitoring_points('${ params }');`;
        database.getPool().query(sproc, (err, res) => {
            if(err)
                next({ status: 500, msg: err }, null);
            else
                next(null, { status: 200, data: res });
        });
};

const getSensorMonitoringPoint = (req, next) => {
    const { params } = req;
    const sproc = `call sp_select_sensor_monitoring_point('${ params }');`;
        database.getPool().query(sproc, (err, res) => {
            if(err)
                next({ status: 500, msg: err }, null);
            else
                next(null, { status: 200, data: res });
        });
};

const patchSensorMonitoringPoint = (req, next) => {

    const { id, name, area } = req;
    
    const sproc = `call sp_update_sensor_monitoring_point(${id}, '${name}', '${area}');`;

    database.getPool().query(sproc, (err, res) => {
        if(err) {
            next({ status: 500, msg: err }, null);
        }
        else
            next(null, { status: 200, data: res });
    });
};

const postSensor = (req, next) => {
    
    const { sensor_monitoring_point_ref, prev_id_ref, name, department, system, type, purpose, upper_threshold, lower_threshold, calibration_date, calibration_valid_weeks, calibration_cert_url, installed_date, commissioned_date, uninstalled_date, status } = req;
    
    const parameters = [];
        parameters.push(parseInt(sensor_monitoring_point_ref));
        parameters.push(prev_id_ref == null || prev_id_ref === "" ? "null" : `"${prev_id_ref}"`);
        parameters.push(`"${name}"`);
        parameters.push(`"${department}"`);
        parameters.push(`"${system}"`);
        parameters.push(`"${type}"`);
        parameters.push(`"${purpose}"`);
        parameters.push(upper_threshold == null || upper_threshold === "" ? "null" : parseInt(upper_threshold));
        parameters.push(lower_threshold == null || lower_threshold === "" ? "null" : parseInt(lower_threshold));
        parameters.push(calibration_date == null || calibration_date === "" ? "null" : `"${calibration_date}"`);
        parameters.push(calibration_valid_weeks == null | calibration_valid_weeks === "" ? "null" : parseInt(calibration_valid_weeks));
        parameters.push(calibration_cert_url == null | calibration_cert_url === "" ? "null" : `"${calibration_cert_url}"`);
        parameters.push(installed_date == null || installed_date === "" ? "null" : `"${installed_date}"`);
        parameters.push(commissioned_date == null || commissioned_date === "" ? "null" : `"${commissioned_date}"`);
        parameters.push(uninstalled_date == null || uninstalled_date === "" ? "null" : `"${uninstalled_date}"`);
        parameters.push(`"${status}"`);
        parameters.push("@insertId")

    const sproc = `call sp_insert_sensor(${parameters.join(', ')});`;
    
    database.getPool().query(sproc, (err, res) => {
        if(err) {
            if(err.code === 'ER_DUP_ENTRY')
                next({ status: 409, msg: err }, null);
            else
                next({ status: 500, msg: err }, null);
        }
        else
            next(null, { status: 201, data: res });
    });
};

const getSensors = (req, next) => {
    const { params } = req;
    const sproc = `call sp_select_sensors(${ params.monitoringPointRef }, '${ params.searchText }');`;
        database.getPool().query(sproc, (err, res) => {
            if(err)
                next({ status: 500, msg: err }, null);
            else
                next(null, { status: 200, data: res });
        });
};

const getSensor = (req, next) => {
    const { params } = req;
    const sproc = `call sp_select_sensor('${ params }');`;
        database.getPool().query(sproc, (err, res) => {
            if(err)
                next({ status: 500, msg: err }, null);
            else
                next(null, { status: 200, data: res });
        });
};

const patchSensor = (req, next) => {

    const { id, sensor_monitoring_point_ref, prev_id_ref, name, department, system, type, purpose, upper_threshold, lower_threshold, calibration_date, calibration_valid_weeks, calibration_cert_url, installed_date, commissioned_date, uninstalled_date, status } = req;
    
    const parameters = [];
        parameters.push(parseInt(id));
        parameters.push(parseInt(sensor_monitoring_point_ref));
        parameters.push(prev_id_ref == null || prev_id_ref === "" ? "null" : `"${prev_id_ref}"`);
        parameters.push(`"${name}"`);
        parameters.push(`"${department}"`);
        parameters.push(`"${system}"`);
        parameters.push(`"${type}"`);
        parameters.push(`"${purpose}"`);
        parameters.push(upper_threshold == null || upper_threshold === "" ? "null" : parseInt(upper_threshold));
        parameters.push(lower_threshold == null || lower_threshold === "" ? "null" : parseInt(lower_threshold));
        parameters.push(calibration_date == null || calibration_date === "" ? "null" : `"${calibration_date}"`);
        parameters.push(calibration_valid_weeks == null | calibration_valid_weeks === "" ? "null" : parseInt(calibration_valid_weeks));
        parameters.push(calibration_cert_url == null | calibration_cert_url === "" ? "null" : `"${calibration_cert_url}"`);
        parameters.push(installed_date == null || installed_date === "" ? "null" : `"${installed_date}"`);
        parameters.push(commissioned_date == null || commissioned_date === "" ? "null" : `"${commissioned_date}"`);
        parameters.push(uninstalled_date == null || uninstalled_date === "" ? "null" : `"${uninstalled_date}"`);
        parameters.push(`"${status}"`);

    const sproc = `call sp_update_sensor(${parameters.join(', ')});`;

    database.getPool().query(sproc, (err, res) => {
        if(err) {
            next({ status: 500, msg: err }, null);
        }
        else
            next(null, { status: 200, data: res });
    });
};

module.exports = {
    postSensorMonitoringPoint: postSensorMonitoringPoint,
    getSensorMonitoringPoints: getSensorMonitoringPoints,
    getSensorMonitoringPoint: getSensorMonitoringPoint,
    patchSensorMonitoringPoint: patchSensorMonitoringPoint,
    postSensor: postSensor,
    getSensors: getSensors,
    getSensor: getSensor,
    patchSensor: patchSensor
}