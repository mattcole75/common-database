const moment = require('moment');

const postPointMachineSwingTimeSchema = {
    id: value => value.length > 0 && value.length <= 6,
    direction: value => value === 'Point Set Right' || value === 'Point Set Left',
    swingTime: value => parseInt(value) === Number(value),
    tmsTimestamp: value => moment(value).isValid()
};

const getPointMachineSwingTimesSchema = {
    id: value => value.length > 0 && value.length <= 6,
    startDate: value => moment(value).isValid(),
    endDate: value => moment(value).isValid()
}

module.exports = {
    postPointMachineSwingTimeSchema: postPointMachineSwingTimeSchema,
    getPointMachineSwingTimesSchema: getPointMachineSwingTimesSchema
}