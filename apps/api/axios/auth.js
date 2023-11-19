const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:5791/auth/api/0.1/',
    timeout: 10000
  });

module.exports = instance;