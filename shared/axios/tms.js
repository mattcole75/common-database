const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:1338/tms/api/0.1/',
    timeout: 10000
  });

module.exports = instance;