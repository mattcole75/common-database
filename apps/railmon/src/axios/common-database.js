import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:1338/cd/api/0.1',
    timeout: 1000
});

export default instance;