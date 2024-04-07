import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://metspark.co.uk/spark/api/0.1',
    timeout: 3000
});

export default instance;