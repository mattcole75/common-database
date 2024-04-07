const repo = require('../repository/sensors');
const axios = require('../../axios/auth');
const log = require('../../logs/logger')();
const config = require('../../config/config');
const version = config.get('version');
const validate = require('../../data/validation/validate');
const { postSensorMonitoringPointSchema, patchSensorMonitoringPointSchema, postSensorSchema, patchSensorSchema } = require('../../data/validation/schema/sensorSchema');

const postSensorMonitoringPoint = (req, next) => {
    // validate the input
    const errors = validate(req.body, postSensorMonitoringPointSchema);
    if(errors.length > 0) {
        return next({ status: 400, msg: 'bad request' }, null);
    }
    // pull the token and access rules from the request
    const { idtoken } = req.headers;
    // declare local header variable
    let header;
    // build header
    if(idtoken) {
        header = {
            'Content-Type': 'application/json',
            idToken: idtoken
        }
    } else {
        log.error(`status: 400 POST postSensorMonitoringPoint v${ version } result: no idToken`);
        return next({ status: 400, res: 'bad request' }, null);
    }
    // authenticate user with the auth microservice
    axios.post('/approvetransaction', { rules: { roles: ['rcm'] }, }, { headers: header })
        .then(authRes => {
            if(authRes.data.status === 200) {
                repo.postSensorMonitoringPoint(req.body, (err, res) => {
                    if(err) {
                        log.error(`status: ${ err.status } POST postSensorMonitoringPoint v${ version } result: ${ JSON.stringify(err) }`);
                        return next(err, null);
                    }
                    else {
                        // log.info(`POST v${version} - success - postVersion - status: ${res.status}`);
                        return next(null, { status: res.status, data: res.data[0][0] });
                    }
                });
            } else {
                log.error(`status: ${ authRes.status } POST db v${ version } result: ${ JSON.stringify(authRes.statusText) }`);
                return(next(authRes.data, null));
            }
        })
        .catch(authErr => {
            if(authErr.response) {
                log.error(`status: ${ authErr.response.status } POST approvetransaction in postSensorMonitoringPoint v${ version } result: ${ JSON.stringify(authErr.response.statusText) }`);
                return(next({ status: authErr.response.status, msg: authErr.response.statusText }, null));
            } else if (authErr.cause) {
                log.error(`status: 500 POST approvetransaction in postSensorMonitoringPoint v${ version } result: ${ JSON.stringify(authErr.cause) }`);
                return(next({ status: 500, msg: authErr.cause }, null));
            } else {
                log.error(`status: 500 POST approvetransaction in postSensorMonitoringPoint v${ version } result: ${ JSON.stringify(authErr) }`);
                return(next({ status: 500, msg: JSON.stringify(authErr) }, null));
            }
        });
};

const getSensorMonitoringPoints = (req, next) => {
    // pull the token and access rules from the request
    const { idtoken, params } = req.headers;
    // declare local header variable
    let header;
    // build header
    if(idtoken) {
        header = {
            'Content-Type': 'application/json',
            idToken: idtoken
        }
    } else {
        log.error(`status: 400 GET getSensorMonitoringPoints v${ version } result: no idToken`);
        return next({ status: 400, res: 'bad request' }, null);
    }
    // authenticate user with the auth microservice
    axios.post('/approvetransaction', { rules: { roles: ['user'] }, }, { headers: header })
        .then(authRes => {
            if(authRes.data.status === 200) {
                repo.getSensorMonitoringPoints({ params: params }, (err, res) => {
                    if(err) {
                        log.error(`status: ${ err.status } GET getSensorMonitoringPoints v${ version } result: ${ JSON.stringify(err) }`);
                        return next(err, null);
                    }
                    else {
                        // log.info(`POST v${version} - success - postVersion - status: ${res.status}`);
                        return next(null, { status: res.status, data: res.data[0] });
                    }
                });
            } else {
                log.error(`status: ${ authRes.status } GET getSensorMonitoringPoints v${ version } result: ${ JSON.stringify(authRes.statusText) }`);
                return(next(authRes.data, null));
            }
        })
        .catch(authErr => {
            if(authErr.response) {
                log.error(`status: ${ authErr.response.status } GET approvetransaction in getSensorMonitoringPoints v${ version } result: ${ JSON.stringify(authErr.response.statusText) }`);
                return(next({ status: authErr.response.status, msg: authErr.response.statusText }, null));
            } else if (authErr.cause) {
                 log.error(`status: 500 GET approvetransaction in getSensorMonitoringPoints v${ version } result: ${ JSON.stringify(authErr.cause) }`);
                 return(next({ status: 500, msg: authErr.cause }, null));
             } else {
                 log.error(`status: 500 GET approvetransaction in getSensorMonitoringPoints v${ version } result: ${ JSON.stringify(authErr) }`);
                 return(next({ status: 500, msg: JSON.stringify(authErr) }, null));
             }
         });
};

const getSensorMonitoringPoint = (req, next) => {
    // pull the token and access rules from the request
    const { idtoken, params } = req.headers;
    // declare local header variable
    let header;
    // build header
    if(idtoken) {
        header = {
            'Content-Type': 'application/json',
            idToken: idtoken
        }
    } else {
        log.error(`status: 400 GET getSensorMonitoringPoint v${ version } result: no idToken`);
        return next({ status: 400, res: 'bad request' }, null);
    }
    // authenticate user with the auth microservice
    axios.post('/approvetransaction', { rules: { roles: ['user'] }, }, { headers: header })
        .then(authRes => {
            if(authRes.data.status === 200) {
                repo.getSensorMonitoringPoint({ params: params }, (err, res) => {
                    if(err) {
                        log.error(`status: ${ err.status } GET getSensorMonitoringPoint v${ version } result: ${ JSON.stringify(err) }`);
                        return next(err, null);
                    }
                    else {
                        // log.info(`POST v${version} - success - postVersion - status: ${res.status}`);
                        return next(null, { status: res.status, data: res.data[0][0] });
                    }
                });
            } else {
                log.error(`status: ${ authRes.status } GET getSensorMonitoringPoint v${ version } result: ${ JSON.stringify(authRes.statusText) }`);
                return(next(authRes.data, null));
            }
        })
        .catch(authErr => {
            if(authErr.response) {
                log.error(`status: ${ authErr.response.status } GET approvetransaction in getSensorMonitoringPoint v${ version } result: ${ JSON.stringify(authErr.response.statusText) }`);
                return(next({ status: authErr.response.status, msg: authErr.response.statusText }, null));
            } else if (authErr.cause) {
                 log.error(`status: 500 GET approvetransaction in getSensorMonitoringPoint v${ version } result: ${ JSON.stringify(authErr.cause) }`);
                 return(next({ status: 500, msg: authErr.cause }, null));
             } else {
                 log.error(`status: 500 GET approvetransaction in getSensorMonitoringPoint v${ version } result: ${ JSON.stringify(authErr) }`);
                 return(next({ status: 500, msg: JSON.stringify(authErr) }, null));
             }
         });
};

const patchSensorMonitoringPoint = (req, next) => {
    // validate the input
    const errors = validate(req.body, patchSensorMonitoringPointSchema);
    if(errors.length > 0) {
        return next({ status: 400, msg: 'bad request' }, null);
    }
    // pull the token and access rules from the request
    const { idtoken } = req.headers;
    // declare local header variable
    let header;
    // build header
    if(idtoken) {
        header = {
            'Content-Type': 'application/json',
            idToken: idtoken
        }
    } else {
        log.error(`status: 400 PATCH patchSensorMonitoringPoint v${ version } result: no idToken`);
        return next({ status: 400, res: 'bad request' }, null);
    }
    // authenticate user with the auth microservice
    axios.post('/approvetransaction', { rules: { roles: ['rcm'] }, }, { headers: header })
        .then(authRes => {
            if(authRes.data.status === 200) {
                repo.patchSensorMonitoringPoint(req.body, (err, res) => {
                    if(err) {
                        log.error(`status: ${ err.status } PATCH patchSensorMonitoringPoint v${ version } result: ${ JSON.stringify(err) }`);
                        return next(err, null);
                    }
                    else {
                        // log.info(`POST v${version} - success - postVersion - status: ${res.status}`);
                        return next(null, { status: res.status, data: res.data[0][0] });
                    }
                });
            } else {
                log.error(`status: ${ authRes.status } PATCH db v${ version } result: ${ JSON.stringify(authRes.statusText) }`);
                return(next(authRes.data, null));
            }
        })
        .catch(authErr => {
            if(authErr.response) {
                log.error(`status: ${ authErr.response.status } PATCH approvetransaction in patchSensorMonitoringPoint v${ version } result: ${ JSON.stringify(authErr.response.statusText) }`);
                return(next({ status: authErr.response.status, msg: authErr.response.statusText }, null));
            } else if (authErr.cause) {
                log.error(`status: 500 PATCH approvetransaction in patchSensorMonitoringPoint v${ version } result: ${ JSON.stringify(authErr.cause) }`);
                return(next({ status: 500, msg: authErr.cause }, null));
            } else {
                log.error(`status: 500 PATCH approvetransaction in patchSensorMonitoringPoint v${ version } result: ${ JSON.stringify(authErr) }`);
                return(next({ status: 500, msg: JSON.stringify(authErr) }, null));
            }
        });
};

const postSensor = (req, next) => {
    // validate the input
    const errors = validate(req.body, postSensorSchema);
    if(errors.length > 0) {
        console.log(errors);
        return next({ status: 400, msg: 'bad request' }, null);
    }
    // pull the token and access rules from the request
    const { idtoken } = req.headers;
    // declare local header variable
    let header;
    // build header
    if(idtoken) {
        header = {
            'Content-Type': 'application/json',
            idToken: idtoken
        }
    } else {
        log.error(`status: 400 POST postSensor v${ version } result: no idToken`);
        return next({ status: 400, res: 'bad request' }, null);
    }
    // authenticate user with the auth microservice
    axios.post('/approvetransaction', { rules: { roles: ['rcm'] }, }, { headers: header })
        .then(authRes => {
            if(authRes.data.status === 200) {
                repo.postSensor(req.body, (err, res) => {
                    if(err) {
                        log.error(`status: ${ err.status } POST postSensor v${ version } result: ${ JSON.stringify(err) }`);
                        return next(err, null);
                    }
                    else {
                        // log.info(`POST v${version} - success - postVersion - status: ${res.status}`);
                        return next(null, { status: res.status, data: res.data[0][0] });
                    }
                });
            } else {
                log.error(`status: ${ authRes.status } POST db v${ version } result: ${ JSON.stringify(authRes.statusText) }`);
                return(next(authRes.data, null));
            }
        })
        .catch(authErr => {
            if(authErr.response) {
                log.error(`status: ${ authErr.response.status } POST approvetransaction in postSensor v${ version } result: ${ JSON.stringify(authErr.response.statusText) }`);
                return(next({ status: authErr.response.status, msg: authErr.response.statusText }, null));
            } else if (authErr.cause) {
                log.error(`status: 500 POST approvetransaction in postSensor v${ version } result: ${ JSON.stringify(authErr.cause) }`);
                return(next({ status: 500, msg: authErr.cause }, null));
            } else {
                log.error(`status: 500 POST approvetransaction in postSensor v${ version } result: ${ JSON.stringify(authErr) }`);
                return(next({ status: 500, msg: JSON.stringify(authErr) }, null));
            }
        });
};

const getSensors = (req, next) => {
    // pull the token and access rules from the request
    const { idtoken, params } = req.headers;
    const parameters = params.split(', ');
    const query = { monitoringPointRef: parseInt(parameters[0]), searchText: parameters[1] === undefined ? '' : parameters[1] };
    // declare local header variable
    let header;
    // build header
    if(idtoken) {
        header = {
            'Content-Type': 'application/json',
            idToken: idtoken
        }
    } else {
        log.error(`status: 400 GET getSensors v${ version } result: no idToken`);
        return next({ status: 400, res: 'bad request' }, null);
    }
    // authenticate user with the auth microservice
    axios.post('/approvetransaction', { rules: { roles: ['user'] }, }, { headers: header })
        .then(authRes => {
            if(authRes.data.status === 200) {
                repo.getSensors({ params: query }, (err, res) => {
                    if(err) {
                        log.error(`status: ${ err.status } GET getSensors v${ version } result: ${ JSON.stringify(err) }`);
                        return next(err, null);
                    }
                    else {
                        // log.info(`POST v${version} - success - postVersion - status: ${res.status}`);
                        return next(null, { status: res.status, data: res.data[0] });
                    }
                });
            } else {
                log.error(`status: ${ authRes.status } GET getSensors v${ version } result: ${ JSON.stringify(authRes.statusText) }`);
                return(next(authRes.data, null));
            }
        })
        .catch(authErr => {
            if(authErr.response) {
                log.error(`status: ${ authErr.response.status } GET approvetransaction in getSensors v${ version } result: ${ JSON.stringify(authErr.response.statusText) }`);
                return(next({ status: authErr.response.status, msg: authErr.response.statusText }, null));
            } else if (authErr.cause) {
                 log.error(`status: 500 GET approvetransaction in getSensors v${ version } result: ${ JSON.stringify(authErr.cause) }`);
                 return(next({ status: 500, msg: authErr.cause }, null));
             } else {
                 log.error(`status: 500 GET approvetransaction in getSensors v${ version } result: ${ JSON.stringify(authErr) }`);
                 return(next({ status: 500, msg: JSON.stringify(authErr) }, null));
             }
         });
};

const getSensor = (req, next) => {
    // pull the token and access rules from the request
    const { idtoken, params } = req.headers;
    // declare local header variable
    let header;
    // build header
    if(idtoken) {
        header = {
            'Content-Type': 'application/json',
            idToken: idtoken
        }
    } else {
        log.error(`status: 400 GET getSensor v${ version } result: no idToken`);
        return next({ status: 400, res: 'bad request' }, null);
    }
    // authenticate user with the auth microservice
    axios.post('/approvetransaction', { rules: { roles: ['user'] }, }, { headers: header })
        .then(authRes => {
            if(authRes.data.status === 200) {
                repo.getSensor({ params: params }, (err, res) => {
                    if(err) {
                        log.error(`status: ${ err.status } GET getSensor v${ version } result: ${ JSON.stringify(err) }`);
                        return next(err, null);
                    }
                    else {
                        // log.info(`POST v${version} - success - postVersion - status: ${res.status}`);
                        return next(null, { status: res.status, data: res.data[0][0] });
                    }
                });
            } else {
                log.error(`status: ${ authRes.status } GET getSensor v${ version } result: ${ JSON.stringify(authRes.statusText) }`);
                return(next(authRes.data, null));
            }
        })
        .catch(authErr => {
            if(authErr.response) {
                log.error(`status: ${ authErr.response.status } GET approvetransaction in getSensor v${ version } result: ${ JSON.stringify(authErr.response.statusText) }`);
                return(next({ status: authErr.response.status, msg: authErr.response.statusText }, null));
            } else if (authErr.cause) {
                 log.error(`status: 500 GET approvetransaction in getSensor v${ version } result: ${ JSON.stringify(authErr.cause) }`);
                 return(next({ status: 500, msg: authErr.cause }, null));
             } else {
                 log.error(`status: 500 GET approvetransaction in getSensor v${ version } result: ${ JSON.stringify(authErr) }`);
                 return(next({ status: 500, msg: JSON.stringify(authErr) }, null));
             }
         });
};

const patchSensor = (req, next) => {
    // validate the input
    const errors = validate(req.body, patchSensorSchema);
    if(errors.length > 0) {
        return next({ status: 400, msg: 'bad request' }, null);
    }
    // pull the token and access rules from the request
    const { idtoken } = req.headers;
    // declare local header variable
    let header;
    // build header
    if(idtoken) {
        header = {
            'Content-Type': 'application/json',
            idToken: idtoken
        }
    } else {
        log.error(`status: 400 PATCH patchSensor v${ version } result: no idToken`);
        return next({ status: 400, res: 'bad request' }, null);
    }
    // authenticate user with the auth microservice
    axios.post('/approvetransaction', { rules: { roles: ['rcm'] }, }, { headers: header })
        .then(authRes => {
            if(authRes.data.status === 200) {
                repo.patchSensor(req.body, (err, res) => {
                    if(err) {
                        log.error(`status: ${ err.status } PATCH patchSensor v${ version } result: ${ JSON.stringify(err) }`);
                        return next(err, null);
                    }
                    else {
                        // log.info(`PATCH v${version} - success - postVersion - status: ${res.status}`);
                        return next(null, { status: res.status, data: res.data[0][0] });
                    }
                });
            } else {
                log.error(`status: ${ authRes.status } PATCH patchSensor v${ version } result: ${ JSON.stringify(authRes.statusText) }`);
                return(next(authRes.data, null));
            }
        })
        .catch(authErr => {
            if(authErr.response) {
                log.error(`status: ${ authErr.response.status } PATCH approvetransaction in patchSensor v${ version } result: ${ JSON.stringify(authErr.response.statusText) }`);
                return(next({ status: authErr.response.status, msg: authErr.response.statusText }, null));
            } else if (authErr.cause) {
                log.error(`status: 500 PATCH approvetransaction in patchSensor v${ version } result: ${ JSON.stringify(authErr.cause) }`);
                return(next({ status: 500, msg: authErr.cause }, null));
            } else {
                log.error(`status: 500 PATCH approvetransaction in patchSensor v${ version } result: ${ JSON.stringify(authErr) }`);
                return(next({ status: 500, msg: JSON.stringify(authErr) }, null));
            }
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