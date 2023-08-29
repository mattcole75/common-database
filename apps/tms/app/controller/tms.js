const repo = require('../repository/tms');
const axios = require('../../../../shared/axios/auth');
const log = require('../../logs/logger')();
const config = require('../../config/config');
const version = config.get('version');
const validate = require('../../data/validation/validate');
const { postPointMachineSwingTimeSchema } = require('../../data/validation/schema/schema');

const postPointMachineSwingTime = (req, next) => {
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
        log.error(`status: 400 POST db v${ version } result: no idToken`);
        return next({ status: 400, res: 'bad request' }, null);
    }
    // authenticate user with the auth microservice
    axios.post('/approvetransaction', { rules: { roles: ['rcm'] }, }, { headers: header })
        .then(authRes => {
            if(authRes.data.status === 200) {
                repo.postPointMachineSwingTime(req.body, (err, res) => {
                    if(err) {
                        log.error(`status: ${ err.status } POST postPointMachineSwingTime v${ version } result: ${ JSON.stringify(err) }`);
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
                log.error(`status: ${ authErr.response.status } POST approvetransaction in postPointMachineSwingTime v${ version } result: ${ JSON.stringify(authErr.response.statusText) }`);
                return(next({ status: authErr.response.status, msg: authErr.response.statusText }, null));
            } else if (authErr.cause) {
                log.error(`status: 500 POST approvetransaction in postPointMachineSwingTime v${ version } result: ${ JSON.stringify(authErr.cause) }`);
                return(next({ status: 500, msg: authErr.cause }, null));
            } else {
                log.error(`status: 500 POST approvetransaction in postPointMachineSwingTime v${ version } result: ${ JSON.stringify(authErr) }`);
                return(next({ status: 500, msg: JSON.stringify(authErr) }, null));
            }
        });
};

module.exports = {
    postPointMachineSwingTime: postPointMachineSwingTime
}