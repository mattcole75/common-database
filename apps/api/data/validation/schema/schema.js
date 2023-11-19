const moment = require('moment');

const postPointMachineSwingTimeSchema = {
    id: value => value.length > 0 && value.length <= 6,
    direction: value => value === 'Points Set Right' || value === 'Points Set Left',
    swingTime: value => parseInt(value) === Number(value),
    tmsTimestamp: value => moment(value).isValid()
};

const getPointMachineSwingTimesSchema = {
    id: value => value.length > 0 && value.length <= 6,
    startDate: value => moment(value).isValid(),
    endDate: value => moment(value).isValid()
}

const postSensorMonitoringPointSchema = {
    name: value => value.length > 3 && value.length <= 64,
    purpose: value => value.length > 5 && value.length <= 256,
    stopRef: value => parseInt(value) === Number(value)
}

module.exports = {
    postPointMachineSwingTimeSchema: postPointMachineSwingTimeSchema,
    getPointMachineSwingTimesSchema: getPointMachineSwingTimesSchema
}