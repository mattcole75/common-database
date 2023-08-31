const config = require('../../config/config');
const service = config.get('service');
const version = config.get('version');
const constoller = require('../controller/tms');

module.exports = (app) => {

    app.post('/' + service + '/api/' + version + '/pointmachineswingtime', (req, res) => {
        res.set('Content-Type', 'application/json');
        constoller.postPointMachineSwingTime(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });

    app.get('/' + service + '/api/' + version + '/pointmachineswingtimes', (req, res) => {
        res.set('Content-Type', 'application/json');
        constoller.getPointMachineSwingTimes(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });
}