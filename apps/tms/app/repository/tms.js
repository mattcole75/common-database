const database = require('../../config/database');

const { postPointMachineSwingTimeSchema } = require('../../data/validation/schema/schema');
const validate = require('../../data/validation/validate');

const postPointMachineSwingTime = (req, next) => {
    const errors = validate(req, postPointMachineSwingTimeSchema);
    if(errors.length > 0) {
        next({ status: 400, msg: 'bad request' }, null);
    }
    else {
        // const sql = 'insert into rm_point_machine_swing_time (point_ref, direction, swing_time, tms_timestamp) values (?)';
        const { id, direction, swingTime, tmsTimestamp } = req;
        const sproc = `call sp_insert_point_machine_swing_time('${id}', '${direction}', ${parseInt(swingTime)}, '${tmsTimestamp}', @insertId);`
        database.getPool().query(sproc, (err, res) => {
            if(err)
                next({ status: 500, msg: err }, null);
            else
                next(null, { status: 201, data: res });
        });
    }

};

module.exports = {
    postPointMachineSwingTime: postPointMachineSwingTime
}