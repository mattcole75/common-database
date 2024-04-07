import * as action from './actionTypes';
import axios from '../../axios/common-database';
import spark from '../../axios/spark';
import { spark_api_key } from '../../config/config';
import { whatIsTheErrorMessage } from '../../shared/errorMessages';

const start = () => {
    return {
        type: action.SENSOR_START
    };
}

const createMonitoringPointSuccess = (id, monitoringPoint, identifier) => {
    return {
        type: action.SENSOR_CREATE_MONITORING_POINT_SUCCESS,
        id: id,
        monitoringPoint: monitoringPoint,
        identifier: identifier
    };
}

const getMonitoringPointsSuccess = (monitoringPoints, identifier) => {
    return {
        type: action.SENSOR_GET_MONITORING_POINTS_SUCCESS,
        monitoringPoints: monitoringPoints,
        identifier: identifier
    };
}

const getMonitoringPointSuccess = (monitoringPoint, identifier) => {
    return {
        type: action.SENSOR_GET_MONITORING_POINT_SUCCESS,
        monitoringPoint: monitoringPoint,
        identifier: identifier
    };
}

const updateMonitoringPointSuccess = (monitoringPoint, identifier) => {
    return {
        type: action.SENSOR_UPDATE_MONITORING_POINT_SUCCESS,
        monitoringPoint: monitoringPoint,
        identifier: identifier
    };
}

const createSensorSuccess = (id, sensor, identifier) => {
    return {
        type: action.SENSOR_CREATE_SENSOR,
        id: id,
        sensor: sensor,
        identifier: identifier
    };
}

const getSensorsSuccess = (sensors, identifier) => {
    return {
        type: action.SENSOR_GET_SENSORS,
        sensors: sensors,
        identifier: identifier
    };
}

const getSensorSuccess = (sensor, identifier) => {
    return {
        type: action.SENSOR_GET_SENSOR,
        sensor: sensor,
        identifier: identifier
    };
}

const updateSensorSuccess = (sensor, identifier) => {
    return {
        type: action.SENSOR_UPDATE_SENSOR_SUCCESS,
        sensor: sensor,
        identifier: identifier
    };
}

const getSensorDataSuccess = (data, identifier) => {
    return {
        type: action.SENSOR_GET_SENSOR_DATA_SUCCESS,
        sensorData: data,
        identifier: identifier
    }
}

const finish = () => {
    return {
        type: action.SENSOR_FINISH
    };
}

const fail = (error) => {
    return {
        type: action.SENSOR_FAIL,
        error: error
    };
}

const reset = () => {
    return {
        type: action.SENSOR_RESET
    };
}

export const sensorReset = () => {
    return dispatch => {
        dispatch(reset());
    };
}

export const sensorCreateMonitoringPoint = (idToken, data, identifier) => {

    return dispatch => {

        dispatch(start);

        axios.post('/sensormonitoringpoint', data, {
            headers: {
                idToken: idToken
            }
        })
        .then(res => {
            const { insertId } = res.data.data;
            dispatch(createMonitoringPointSuccess(insertId, data, identifier));
        })
        .then(() => {
            dispatch(finish());
        })
        .catch(err => {
            dispatch(fail(whatIsTheErrorMessage(err)));
        });
    };
}

export const sensorGetMonitoringPoints = (idToken, params, identifier) => {
    return dispatch => {

        dispatch(start());

        const config = {
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                params: params
            }
        };
        
        axios.get('/sensormonitoringpoints', config)
            .then(res => {
                dispatch(getMonitoringPointsSuccess(res.data.data, identifier));
            })
            .then(() => {
                dispatch(finish());
            })
            .catch(err => {
                dispatch(fail(whatIsTheErrorMessage(err)));
            })
    };
}

export const sensorGetMonitoringPoint = (idToken, params, identifier) => {
    return dispatch => {

        dispatch(start());

        const config = {
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                params: params
            }
        };

        axios.get('/sensormonitoringpoint', config)
            .then(res => {

                dispatch(getMonitoringPointSuccess(res.data.data, identifier));
            })
            .then(() => {
                dispatch(finish());
            })
            .catch(err => {
                dispatch(fail(whatIsTheErrorMessage(err)));
            });
    };
}

export const sensorUpdateMonitoringPoint = (idToken, data, identifier) => {
    return dispatch => {

        dispatch(start);

        axios.patch('/sensormonitoringpoint', data, {
            headers: {
                idToken: idToken
            }
        })
        .then(res => {
            dispatch(updateMonitoringPointSuccess(data, identifier));
        })
        .then(() => {
            dispatch(finish());
        })
        .catch(err => {
            dispatch(fail(whatIsTheErrorMessage(err)));
        });
    };
}

export const sensorCreateSensor = (idToken, data, identifier) => {
    return dispatch => {

        dispatch(start);

        axios.post('/sensor', data, {
            headers: {
                idToken: idToken
            }
        })
        .then(res => {
            const { insertId } = res.data.data;
            dispatch(createSensorSuccess(insertId, data, identifier));
        })
        .then(() => {
            dispatch(finish());
        })
        .catch(err => {
            dispatch(fail(whatIsTheErrorMessage(err)));
        });
    };
}

export const sensorGetSensors = (idToken, monitoringPointRef, searchText, identifier) => {
    return dispatch => {

        dispatch(start());

        const config = {
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                params: `${ monitoringPointRef}, ${ searchText }`
            }
        };
        
        axios.get('/sensors', config)
            .then(res => {
                dispatch(getSensorsSuccess(res.data.data, identifier));
            })
            .then(() => {
                dispatch(finish());
            })
            .catch(err => {
                dispatch(fail(whatIsTheErrorMessage(err)));
            })
    };
}

export const sensorGetSensor = (idToken, params, identifier) => {
    return dispatch => {

        dispatch(start());

        const config = {
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                params: params
            }
        };

        axios.get('/sensor', config)
            .then(res => {

                dispatch(getSensorSuccess(res.data.data, identifier));
            })
            .then(() => {
                dispatch(finish());
            })
            .catch(err => {
                dispatch(fail(whatIsTheErrorMessage(err)));
            });
    };
}

export const sensorUpdateSensor = (idToken, data, identifier) => {
    return dispatch => {

        dispatch(start);

        axios.patch('/sensor', data, {
            headers: {
                idToken: idToken
            }
        })
        .then(res => {
            dispatch(updateSensorSuccess(data, identifier));
        })
        .then(() => {
            dispatch(finish());
        })
        .catch(err => {
            dispatch(fail(whatIsTheErrorMessage(err)));
        });
    };
}

export const sensorGetSensorData = (uid, identifier) => {

    return dispatch => {
        
        dispatch(start());

        const config = {
            headers: {
                'content-type': 'application/json',
                idToken: spark_api_key,
                param: uid
            }
        };
        
        spark.get('/sensordata', config)
        .then(res => {
            dispatch(getSensorDataSuccess(res.data.data, identifier));
        })
        .then(() => {
            dispatch(finish());
        })
        .catch(err => {
            dispatch(fail(whatIsTheErrorMessage(err)));
        });
    };
}