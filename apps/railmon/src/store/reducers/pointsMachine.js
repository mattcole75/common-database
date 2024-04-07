import * as actionType from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    pointsMachines: [],
    pointsMachine: null,
    pointsMachinePerformanceData: [],
    identifier: null,
    redirectPath: ''
}

const start = (state) => {
    return { ...state,
        error: null,
        loading: true
    };
}

const getPointsMachinesSuccess = (state, action) => {
    return { ...state,
        pointsMachines: action.pointsMachines,
        identifier: action.identifier
    };
}

const getPointsMachineSuccess = (state, action) => {
    return { ...state,
        pointsMachine: action.pointsMachine,
        identifier: action.identifier
    };
}

const getPointsMachinePerformanceData = (state, action) => {
    return { ...state,
        pointsMachinePerformanceData: action.pointsMachinePerformanceData,
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
        case actionType.POINTS_MACHINE_START: return start(state);
        case actionType.POINTS_MACHINES_GET_SUCCESS: return getPointsMachinesSuccess(state, action);
        case actionType.POINTS_MACHINE_GET_SUCCESS: return getPointsMachineSuccess(state, action);
        case actionType.POINTS_MACHINE_GET_PERFORMANCE_DATA_SUCCESS: return getPointsMachinePerformanceData(state, action);
        case actionType.POINTS_MACHINE_FINISH: return finish(state);
        case actionType.POINTS_MACHINE_FAIL: return fail(state, action);
        case actionType.POINTS_MACHINE_RESET: return reset();
        default: return state;
    }
};

export default reducer;