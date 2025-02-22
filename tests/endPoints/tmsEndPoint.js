const config = require('../../apps/api/config/config');
const service = config.get('service');
const version = config.get('version');

const supertest = require('supertest');
const authUrl = 'http://localhost:1338/' + service + '/api/' + version;

const auth = supertest(authUrl);

module.exports = auth;