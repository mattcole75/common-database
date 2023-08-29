const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:1337/spark/api/0.1', // testing on local emulator
    // baseURL: 'http://metspark.co.uk/spark/api/0.1', // live server
    timeout: 10000
  });

module.exports = instance;