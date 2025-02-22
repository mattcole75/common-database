const config = require('../../config/config');
const service = config.get('service');
const version = config.get('version');
const controller = require('../controller/points');

module.exports = (app) => {

    app.post('/' + service + '/api/' + version + '/pointsmachineswingtime', (req, res) => {
        res.set('Content-Type', 'application/json');
        controller.postPointsMachineSwingTime(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });

    app.get('/' + service + '/api/' + version + '/pointsmachineswingtimes', (req, res) => {
        res.set('Content-Type', 'application/json');
        controller.getPointsMachineSwingTimes(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });

    app.get('/' + service + '/api/' + version + '/monitoredpointsmachines', (req, res) => {
        res.set('Content-Type', 'application/json');
        controller.getMonitoredPointsMachines(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });

    app.get('/' + service + '/api/' + version + '/pointsmachine', (req, res) => {
        res.set('Content-Type', 'application/json');
        controller.getPointsMachine(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });

    app.post('/' + service + '/api/' + version + '/postsensormonitoringpoint', (req, res) => {
        res.set('Content-Type', 'application/json');
        controller.postSensorMonitoringPoint(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });
}