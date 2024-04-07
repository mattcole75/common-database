const config = require('../../config/config');
const service = config.get('service');
const version = config.get('version');
const controller = require('../controller/sensors');

module.exports = (app) => {

    app.post('/' + service + '/api/' + version + '/sensormonitoringpoint', (req, res) => {
        res.set('Content-Type', 'application/json');
        controller.postSensorMonitoringPoint(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });

    app.get('/' + service + '/api/' + version + '/sensormonitoringpoints', (req, res) => {
        res.set('Content-Type', 'application/json');
        controller.getSensorMonitoringPoints(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });

    app.get('/' + service + '/api/' + version + '/sensormonitoringpoint', (req, res) => {
        res.set('Content-Type', 'application/json');
        controller.getSensorMonitoringPoint(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });

    app.patch('/' + service + '/api/' + version + '/sensormonitoringpoint', (req, res) => {
        res.set('Content-Type', 'application/json');
        controller.patchSensorMonitoringPoint(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });

    app.post('/' + service + '/api/' + version + '/sensor', (req, res) => {
        res.set('Content-Type', 'application/json');
        controller.postSensor(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });

    app.get('/' + service + '/api/' + version + '/sensors', (req, res) => {
        res.set('Content-Type', 'application/json');
        controller.getSensors(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });

    app.get('/' + service + '/api/' + version + '/sensor', (req, res) => {
        res.set('Content-Type', 'application/json');
        controller.getSensor(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });

    app.patch('/' + service + '/api/' + version + '/sensor', (req, res) => {
        res.set('Content-Type', 'application/json');
        controller.patchSensor(req, (err, result) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(result.status).send(result);
        });
    });
}