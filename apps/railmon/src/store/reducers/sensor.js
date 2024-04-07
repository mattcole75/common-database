import * as actionType from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    monitoringPoints: [],
    monitoringPoint: null,
    sensors: [],
    sensor: null,
    sensorData: [],
    identifier: null,
    redirectPath: '/monitoring/sensormonitoringpoints'
}

const start = (state) => {
    return { ...state,
        error: null,
        loading: true
    };
}

const createMonitoringPointSuccess = (state, action) => {

    let updatedMonitoringPoints = [ ...state.monitoringPoints ];
    const newMonitotingPoint = { ...action.monitoringPoint, id: action.id };

    updatedMonitoringPoints.push(newMonitotingPoint);

    return { ...state,
        monitoringPoints: updatedMonitoringPoints,
        identifier: action.identifier
    };
}

const getMonitoringPointsSuccess = (state, action) => {
    return { ...state,
        monitoringPoints: action.monitoringPoints,
        identifier: action.identifier
    };
}

const getMonitoringPointSuccess = (state, action) => {
    return { ...state,
        monitoringPoint: action.monitoringPoint,
        identifier: action.identifier
    };
}

const updateMonitoringPointSuccess = (state, action) => {
    let updatedMonitoringPoints = [ ...state.monitoringPoints ];
    const index = updatedMonitoringPoints.findIndex(ele => ele.id === action.monitoringPoint.id);

    updatedMonitoringPoints[index] = { ...updatedMonitoringPoints[index], ...action.monitoringPoint };
   
    return { ...state,
        monitoringPoints: updatedMonitoringPoints,
        monitoringPoint: null
    };
}

const createSensorSuccess = (state, action) => {

    let updatedSensors = [ ...state.sensors ];
    const newSensor = { ...action.sensor, id: action.id };

    updatedSensors.push(newSensor);

    return { ...state,
        sensors: updatedSensors,
        identifier: action.identifier
    };
}

const getSensorsSuccess = (state, action) => {
    return { ...state,
        sensors: action.sensors,
        identifier: action.identifier
    };
}

const getSensorSuccess = (state, action) => {
    return { ...state,
        sensor: action.sensor,
        identifier: action.identifier
    };
}

const updateSensorSuccess = (state, action) => {
    let updatedSensors = [ ...state.sensors ];
    const index = updatedSensors.findIndex(ele => ele.id === action.sensor.id);

    updatedSensors[index] = { ...updatedSensors[index], ...action.sensor };
   
    return { ...state,
        sensors: updatedSensors,
        sensor: null
    };
}
const getSensorDataSuccess = (state, action) => {
    return { ...state,
        sensorData: action.sensorData,
        identifier: action.identifier
    };
}

const finish = (state) => {
    return { ...state,
        loading: false,
        identifier: null
    };
}

const fail = (state, action) => {
    return { ...state,
        loading: false,
        error: action.error
    };
}

const reset = () => {
    return initialState;
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.SENSOR_START: return start(state);
        case actionType.SENSOR_CREATE_MONITORING_POINT_SUCCESS: return createMonitoringPointSuccess(state, action);
        case actionType.SENSOR_GET_MONITORING_POINTS_SUCCESS: return getMonitoringPointsSuccess(state, action);
        case actionType.SENSOR_GET_MONITORING_POINT_SUCCESS: return getMonitoringPointSuccess(state, action);
        case actionType.SENSOR_UPDATE_MONITORING_POINT_SUCCESS: return updateMonitoringPointSuccess(state, action);
        case actionType.SENSOR_CREATE_SENSOR: return createSensorSuccess(state, action);
        case actionType.SENSOR_GET_SENSORS: return getSensorsSuccess(state, action);
        case actionType.SENSOR_GET_SENSOR: return getSensorSuccess(state, action);
        case actionType.SENSOR_UPDATE_SENSOR_SUCCESS: return updateSensorSuccess(state, action);
        case actionType.SENSOR_GET_SENSOR_DATA_SUCCESS: return getSensorDataSuccess(state, action);
        case actionType.SENSOR_FINISH: return finish(state);
        case actionType.SENSOR_FAIL: return fail(state, action);
        case actionType.SENSOR_RESET: return reset();
        default: return state;
    };
}

export default reducer;