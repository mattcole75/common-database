import * as action from './actionTypes';
import axios from '../../axios/tms';
import { whatIsTheErrorMessage } from '../../shared/errorMessages';

// reducer interface functions
const start = () => {
    return {
        type: action.POINTS_MACHINE_START
    };
}

const getPointsMachinesSuccess = (pointsMachines, identifier) => {
    return {
        type: action.POINTS_MACHINES_GET_SUCCESS,
        pointsMachines: pointsMachines,
        identifier: identifier
    };
}

const getPointsMachineSuccess = (pointsMachine, identifier) => {
    return {
        type: action.POINTS_MACHINE_GET_SUCCESS,
        pointsMachine: pointsMachine,
        identifier: identifier
    }
}

const getPointsMachinePerformanceDataSuccess = (pointsMachinePerformanceData, identifier) => {
    return {
        type: action.POINTS_MACHINE_GET_PERFORMANCE_DATA_SUCCESS,
        pointsMachinePerformanceData: pointsMachinePerformanceData,
        identifier: identifier
    };
}

const finish = () => {
    return {
        type: action.POINTS_MACHINE_FINISH
    };
}

const fail = (error) => {
    return {
        type: action.POINTS_MACHINE_FAIL,
        error: error
    }
}

const reset = () => {
    return {
        type: action.POINTS_MACHINE_RESET
    };
}

export const getMonitoredPointsMachines = (idToken, localId, params, identifier) => {
    return dispatch => {

        dispatch(start());

        const config = {
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                localId: localId,
                params: params
            }
        };
        
        axios.get('/monitoredpointsmachines', config)
            .then(res => {
                dispatch(getPointsMachinesSuccess(res.data.data, identifier));
            })
            .then(() => {
                dispatch(finish());
            })
            .catch(err => {
                dispatch(fail(whatIsTheErrorMessage(err)));
            })
    };
}

export const getPointsMachine = (idToken, localId, params, identifier) => {
    return dispatch => {

        dispatch(start());

        const config = {
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                localId: localId,
                params: params
            }
        };
        
        axios.get('/pointsmachine', config)
            .then(res => {
                dispatch(getPointsMachineSuccess(res.data.data, identifier));
            })
            .then(() => {
                dispatch(finish());
            })
            .catch(err => {
                dispatch(fail(whatIsTheErrorMessage(err)));
            })
    };
}

export const getPointsMachinePerformanceData = (idToken, localId, id, startDate, endDate, identifier) => {
    return dispatch => {

        dispatch(start());

        const config = {
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                localId: localId,
                params: `${id},${startDate},${endDate}`
            }
        };
        
        axios.get('/pointsmachineswingtimes', config)
            .then(res => {
                dispatch(getPointsMachinePerformanceDataSuccess(res.data.data, identifier));
            })
            .then(() => {
                dispatch(finish());
            })
            .catch(err => {
                dispatch(fail(whatIsTheErrorMessage(err)));
            })
    };
}

export const pointsMachineStateReset = () => {
    return dispatch => {
        dispatch(reset());
    };
};