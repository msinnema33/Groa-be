const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('../api/server');

// ------------------- REGISTER ENDPOINT ---------------------- //
describe('Users Router', function() {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('/register', function() {
        it ('should register a user', async function() {
            await request(server)
                .post('/api/users/register')
                .send({ username: 'User1', password: 'pass', name: 'Billy'})
                .expect(201);
        });

        it ('should NOT register a user', async function() {
            await request(server)
                .post('/api/users/register')
                .send({ username: 'User2' })
                .expect(400);
        });
    });
});



// ------------------- LOGIN ENDPOINT ---------------------- //
describe('Users Router', function() {
    describe('/login', function() {
        it ('should login a user', async function() {
            await request(server)
                .post('/api/users/register')
                .send({ username: 'User2', password: 'pass', name: 'Bobby'})
            await request(server)
                .post('/api/users/login')
                .send({ username: 'User2', password: 'pass' })
                .expect(200);
        });

        it ('should NOT login a user', async function() {
            await request(server)
                .post('/api/users/login')
                .send({ username: 'User5', password: 'pass' })
                .expect(401);
        });
    });
})
