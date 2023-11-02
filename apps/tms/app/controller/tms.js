const repo = require('../repository/tms');
const axios = require('../../../../shared/axios/auth');
const log = require('../../logs/logger')();
const config = require('../../config/config');
const version = config.get('version');
const validate = require('../../data/validation/validate');
const { postPointMachineSwingTimeSchema, getPointMachineSwingTimesSchema } = require('../../data/validation/schema/schema');

const postPointsMachineSwingTime = (req, next) => {
    // validate the input
    const errors = validate(req.body, postPointMachineSwingTimeSchema);
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
        log.error(`status: 400 POST postPointMachineSwingTime v${ version } result: no idToken`);
        return next({ status: 400, res: 'bad request' }, null);
    }
    // authenticate user with the auth microservice
    axios.post('/approvetransaction', { rules: { roles: ['rcm'] }, }, { headers: header })
        .then(authRes => {
            if(authRes.data.status === 200) {
                repo.postPointsMachineSwingTime(req.body, (err, res) => {
                    if(err) {
                        log.error(`status: ${ err.status } POST postPointsMachineSwingTime v${ version } result: ${ JSON.stringify(err) }`);
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
                console.log(authErr.response);
                log.error(`status: ${ authErr.response.status } POST approvetransaction in postPointsMachineSwingTime v${ version } result: ${ JSON.stringify(authErr.response.statusText) }`);
                return(next({ status: authErr.response.status, msg: authErr.response.statusText }, null));
            } else if (authErr.cause) {
                log.error(`status: 500 POST approvetransaction in postPointsMachineSwingTime v${ version } result: ${ JSON.stringify(authErr.cause) }`);
                return(next({ status: 500, msg: authErr.cause }, null));
            } else {
                log.error(`status: 500 POST approvetransaction in postPointsMachineSwingTime v${ version } result: ${ JSON.stringify(authErr) }`);
                return(next({ status: 500, msg: JSON.stringify(authErr) }, null));
            }
        });
};

const getPointsMachineSwingTimes = (req, next) => {
    // pull the token and access rules from the request
    const { idtoken, params } = req.headers;
    // validate the input
    const parameters = params.split(',');
    const query = { id: parameters[0], startDate: parameters[1], endDate: parameters[2] };
    const errors = validate(query, getPointMachineSwingTimesSchema);
    if(errors.length > 0) {
        return next({ status: 400, msg: 'bad request' }, null);
    }
    // declare local header variable
    let header;
    //  // build header
    if(idtoken) {
        header = {
            'Content-Type': 'application/json',
            idToken: idtoken
        }
    } else {
        log.error(`status: 400 GET getPointMachineSwingTimes v${ version } result: no idToken`);
        return next({ status: 400, res: 'bad request' }, null);
    }
    // authenticate user with the auth microservice
        axios.post('/approvetransaction', { rules: { roles: ['rcm'] }, }, { headers: header })
        .then(authRes => {
            if(authRes.data.status === 200) {
                repo.getPointsMachineSwingTimes(query, (err, res) => {
                    if(err) {
                        log.error(`status: ${ err.status } GET getPointMachineSwingTimes v${ version } result: ${ JSON.stringify(err) }`);
                        return next(err, null);
                    }
                    else {
                        // log.info(`POST v${version} - success - postVersion - status: ${res.status}`);
                        return next(null, { status: res.status, data: res.data[0] });
                    }
                });
            } else {
                log.error(`status: ${ authRes.status } GET getPointMachineSwingTimes v${ version } result: ${ JSON.stringify(authRes.statusText) }`);
                return(next(authRes.data, null));
            }
        })
        .catch(authErr => {
            if(authErr.response) {
                log.error(`status: ${ authErr.response.status } GET approvetransaction in getPointMachineSwingTimes v${ version } result: ${ JSON.stringify(authErr.response.statusText) }`);
                return(next({ status: authErr.response.status, msg: authErr.response.statusText }, null));
            } else if (authErr.cause) {
                log.error(`status: 500 GET approvetransaction in getPointMachineSwingTimes v${ version } result: ${ JSON.stringify(authErr.cause) }`);
                return(next({ status: 500, msg: authErr.cause }, null));
            } else {
                log.error(`status: 500 GET approvetransaction in getPointMachineSwingTimes v${ version } result: ${ JSON.stringify(authErr) }`);
                return(next({ status: 500, msg: JSON.stringify(authErr) }, null));
            }
        });
};

const getMonitoredPointsMachines = (req, next) => {
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
        log.error(`status: 400 GET getMonitoredPointsMachines v${ version } result: no idToken`);
        return next({ status: 400, res: 'bad request' }, null);
    }
    // authenticate user with the auth microservice
    axios.post('/approvetransaction', { rules: { roles: ['user'] }, }, { headers: header })
        .then(authRes => {
            if(authRes.data.status === 200) {
                repo.getMonitoredPointsMachines({ params: params }, (err, res) => {
                    if(err) {
                        log.error(`status: ${ err.status } GET getMonitoredPointsMachines v${ version } result: ${ JSON.stringify(err) }`);
                        return next(err, null);
                    }
                    else {
                        // log.info(`POST v${version} - success - postVersion - status: ${res.status}`);
                        return next(null, { status: res.status, data: res.data[0] });
                    }
                });
            } else {
                log.error(`status: ${ authRes.status } GET getMonitoredPointsMachines v${ version } result: ${ JSON.stringify(authRes.statusText) }`);
                return(next(authRes.data, null));
            }
        })
        .catch(authErr => {
            if(authErr.response) {
                log.error(`status: ${ authErr.response.status } GET approvetransaction in getMonitoredPointsMachines v${ version } result: ${ JSON.stringify(authErr.response.statusText) }`);
                return(next({ status: authErr.response.status, msg: authErr.response.statusText }, null));
            } else if (authErr.cause) {
                 log.error(`status: 500 GET approvetransaction in getMonitoredPointsMachines v${ version } result: ${ JSON.stringify(authErr.cause) }`);
                 return(next({ status: 500, msg: authErr.cause }, null));
             } else {
                 log.error(`status: 500 GET approvetransaction in getMonitoredPointsMachines v${ version } result: ${ JSON.stringify(authErr) }`);
                 return(next({ status: 500, msg: JSON.stringify(authErr) }, null));
             }
         });
};

const getPointsMachine = (req, next) => {
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
        log.error(`status: 400 GET getPointsMachine v${ version } result: no idToken`);
        return next({ status: 400, res: 'bad request' }, null);
    }
    // authenticate user with the auth microservice
    axios.post('/approvetransaction', { rules: { roles: ['user'] }, }, { headers: header })
        .then(authRes => {
            if(authRes.data.status === 200) {
                repo.getPointsMachine({ params: params }, (err, res) => {
                    if(err) {
                        log.error(`status: ${ err.status } GET getPointsMachine v${ version } result: ${ JSON.stringify(err) }`);
                        return next(err, null);
                    }
                    else {
                        // log.info(`POST v${version} - success - postVersion - status: ${res.status}`);
                        return next(null, { status: res.status, data: res.data[0][0] });
                    }
                });
            } else {
                log.error(`status: ${ authRes.status } GET getPointsMachine v${ version } result: ${ JSON.stringify(authRes.statusText) }`);
                return(next(authRes.data, null));
            }
        })
        .catch(authErr => {
            if(authErr.response) {
                log.error(`status: ${ authErr.response.status } GET approvetransaction in getPointsMachine v${ version } result: ${ JSON.stringify(authErr.response.statusText) }`);
                return(next({ status: authErr.response.status, msg: authErr.response.statusText }, null));
            } else if (authErr.cause) {
                 log.error(`status: 500 GET approvetransaction in getPointsMachine v${ version } result: ${ JSON.stringify(authErr.cause) }`);
                 return(next({ status: 500, msg: authErr.cause }, null));
             } else {
                 log.error(`status: 500 GET approvetransaction in getPointsMachine v${ version } result: ${ JSON.stringify(authErr) }`);
                 return(next({ status: 500, msg: JSON.stringify(authErr) }, null));
             }
         });
};

module.exports = {
    postPointsMachineSwingTime: postPointsMachineSwingTime,
    getPointsMachineSwingTimes: getPointsMachineSwingTimes,
    getMonitoredPointsMachines: getMonitoredPointsMachines,
    getPointsMachine: getPointsMachine
}