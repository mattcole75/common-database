const endPoint = require('./endPoints/tmsEndPoint');
const authEndPoint = require('./endPoints/authEndPoint');
const crypto = require('crypto');
const moment = require('moment');

let wrongToken = '7c58e9e7cd20ae44f354d59f7a73ebb7e346d5e5a61517e33e0e97c4c79d25a826debfc57ca2e99c66108f80801059a9d2d94d14886fc98539e4ab324a5da2e125aa7e7d26af000e103fcbc75b0ed9caa75895ba26efa248fc0c2154a581786679c6a2a9120fadc9e68fef80bc30d6a8644cd19362e035a85e130d675e2e30a9';
let idToken = null;
let localId = null;

describe('Test 1 - POST Points Machine Swing Time', () => {

    it('should, fail (403) for an unauthorised request', async () => {
        await endPoint.post('/pointmachineswingtime')
            .set({
                'Content-Type': 'application/json',
                idToken: wrongToken
            })
            .send({
                id: 'IRK02M',
                direction: 'Point Set Right',
                swingTime: '3210',
                tmsTimestamp: moment().format()
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403)
    });

    it('should, login and return the user details and token', async () => {
        await authEndPoint.post('/user/login')
            .send({
                email: 'rand.althor@system.com',
                password: crypto.createHash('sha256').update('1234abcd!').digest('hex')
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toBeDefined();
                expect(res.body.status).toBe(200);
                expect(res.body.user.displayName).toBe('Rand Althor');
                expect(res.body.user.email).toBe('rand.althor@system.com');
                expect(res.body.user.idToken).toHaveLength(256);
                idToken = res.body.user.idToken;
                localId = res.body.user.localId;
            });
    });

    it('should, fail to insert with an longer than 7 characters', async () => {
        await endPoint.post('/pointmachineswingtime')
        .set({
            'Content-Type': 'application/json',
            idToken: idToken
        })
        .send({
            id: 'IRK02MM',
            direction: 'Point Set Right',
            swingTime: '3210',
            tmsTimestamp: moment().format()
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(res => {
            const { status, msg } = res.body;
            expect(status).toBe(400);
            expect(msg).toBe('bad request');
        });
    });

    it('should, fail to insert with an incorrect defined direction', async () => { // should be Set Point Right or Set Point Left
        await endPoint.post('/pointmachineswingtime')
        .set({
            'Content-Type': 'application/json',
            idToken: idToken
        })
        .send({
            id: 'IRK02M',
            direction: 'Point Set Up',
            swingTime: '3210',
            tmsTimestamp: moment().format()
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(res => {
            const { status, msg } = res.body;
            expect(status).toBe(400);
            expect(msg).toBe('bad request');
        });
    });

    it('should, fail to insert with an invalid integer for the swing time', async () => {
        await endPoint.post('/pointmachineswingtime')
        .set({
            'Content-Type': 'application/json',
            idToken: idToken
        })
        .send({
            id: 'IRK02M',
            direction: 'Point Set Right',
            swingTime: '3210n',
            tmsTimestamp: moment().format()
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(res => {
            const { status, msg } = res.body;
            expect(status).toBe(400);
            expect(msg).toBe('bad request');
        });
    });

    it('should, fail to insert with an invalid tms timestamp', async () => {
        await endPoint.post('/pointmachineswingtime')
        .set({
            'Content-Type': 'application/json',
            idToken: idToken
        })
        .send({
            id: 'IRK02MM',
            direction: 'Point Set Right',
            swingTime: '3210',
            tmsTimestamp: '19/04/2023 13:56:43'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(res => {
            const { status, msg } = res.body;
            expect(status).toBe(400);
            expect(msg).toBe('bad request');
        });
    });

    it('should, insert a point swing time into the database', async () => {
        await endPoint.post('/pointmachineswingtime')
        .set({
            'Content-Type': 'application/json',
            idToken: idToken
        })
        .send({
            id: 'IRK02M',
            direction: 'Point Set Right',
            swingTime: 3210,
            tmsTimestamp: moment().format('YYYY-MM-DD HH:mm:ss.SSS')
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => {
            const { insertId } = res.body.data;
            expect(insertId).toBeDefined();
            // expect(insertId).toBe(1);
            // parentAssetRef = insertId;
        });
    });
});

describe('Test 2 - GET Points Machine Swing Times', () => {
    
    it('should, fail (403) for an unauthorised request', async () => {
        await endPoint.get('/pointmachineswingtimes')
            .set({
                'Content-Type': 'application/json',
                idToken: wrongToken,
                params: 'IRK02M'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403)
    });

    // it('should, login and return the user details and token', async () => {
    //     await authEndPoint.post('/user/login')
    //         .send({
    //             email: 'althea.vestrit@system.com',
    //             password: crypto.createHash('sha256').update('1234abcd!').digest('hex')
    //         })
    //         .set('Accept', 'application/json')
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .then(res => {
    //             expect(res.body).toBeDefined();
    //             expect(res.body.status).toBe(200);
    //             expect(res.body.user.displayName).toBe('Althea Vestrit');
    //             expect(res.body.user.email).toBe('althea.vestrit@system.com');
    //             expect(res.body.user.idToken).toHaveLength(256);
    //             idToken = res.body.user.idToken;
    //             localId = res.body.user.localId;
    //         });
    // });

    it('should, get all the point swing times from the database based on the given parameters', async () => {
        await endPoint.get('/pointmachineswingtimes')
        .set({
            'Content-Type': 'application/json',
            idToken: idToken,
            params: 'IRK02M,2023-08-29 09:00,2023-08-29 17:00'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    });
});

describe('Test 3 - Points Machine CRUD', () => {

});

