const axios = require('../../../shared/axios/auth');
const crypto = require('crypto');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./tmp');

axios.post('/user/login', {
    email: 'althea.vestrit@system.com',
    password: crypto.createHash('sha256').update('1234abcd!').digest('hex')
})
.then(res => {
    localStorage.setItem('localId', res.data.user.localId);
    localStorage.setItem('idToken', res.data.user.idToken);
})
.catch(err => {
    console.log(err);
});