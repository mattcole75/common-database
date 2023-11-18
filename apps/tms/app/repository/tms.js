const database = require('../../config/database');

const postPointsMachineSwingTime = (req, next) => {
    
    const { id, direction, swingTime, tmsTimestamp } = req;
    const sproc = `call sp_insert_points_machine_swing_time('${id}', '${direction}', ${parseInt(swingTime)}, '${tmsTimestamp}', @insertId);`;
    database.getPool().query(sproc, (err, res) => {
        if(err)
            next({ status: 500, msg: err }, null);
        else
            next(null, { status: 201, data: res });
    });
};

const getPointsMachineSwingTimes = (req, next) => {

    const { id, startDate, endDate } = req;
    const sproc = `call sp_select_points_machine_swing_times('${id}', '${startDate}', '${endDate}');`;
        database.getPool().query(sproc, (err, res) => {
            if(err)
                next({ status: 500, msg: err }, null);
            else
                next(null, { status: 200, data: res });
        });
};

const getMonitoredPointsMachines = (req, next) => {
    const { params } = req;
    const sproc = `call sp_select_monitored_points_machines('${ params }');`;
        database.getPool().query(sproc, (err, res) => {
            if(err)
                next({ status: 500, msg: err }, null);
            else
                next(null, { status: 200, data: res });
        });
};

const getPointsMachine = (req, next) => {
    const { params } = req;
    const sproc = `call sp_select_points_machine('${ params }');`;
        database.getPool().query(sproc, (err, res) => {
            if(err)
                next({ status: 500, msg: err }, null);
            else
                next(null, { status: 200, data: res });
        });
};

const postSensorMonitoringPoint = (req, next) => {
    
    const { name, purpose, stopRef } = req;
    const sproc = `call sp_insert_sensor_monitoring_point('${name}', '${purpose}', ${parseInt(stopRef)}, @insertId);`;
    database.getPool().query(sproc, (err, res) => {
        if(err)
            next({ status: 500, msg: err }, null);
        else
            next(null, { status: 201, data: res });
    });
};

module.exports = {
    postPointsMachineSwingTime: postPointsMachineSwingTime,
    getPointsMachineSwingTimes: getPointsMachineSwingTimes,
    getMonitoredPointsMachines: getMonitoredPointsMachines,
    getPointsMachine: getPointsMachine,
    postSensorMonitoringPoint: postSensorMonitoringPoint
}