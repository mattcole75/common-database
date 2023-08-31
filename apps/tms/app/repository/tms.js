const database = require('../../config/database');

const postPointMachineSwingTime = (req, next) => {
    
    const { id, direction, swingTime, tmsTimestamp } = req;
    const sproc = `call sp_insert_point_machine_swing_time('${id}', '${direction}', ${parseInt(swingTime)}, '${tmsTimestamp}', @insertId);`;
    database.getPool().query(sproc, (err, res) => {
        if(err)
            next({ status: 500, msg: err }, null);
        else
            next(null, { status: 201, data: res });
    });
};

const getPointMachineSwingTimes = (req, next) => {

    const { id, startDate, endDate } = req;
    const sproc = `call sp_select_point_machine_swing_times('${id}', '${startDate}', '${endDate}');`;
        database.getPool().query(sproc, (err, res) => {
            if(err)
                next({ status: 500, msg: err }, null);
            else
                next(null, { status: 200, data: res });
        });
};

module.exports = {
    postPointMachineSwingTime: postPointMachineSwingTime,
    getPointMachineSwingTimes: getPointMachineSwingTimes
}