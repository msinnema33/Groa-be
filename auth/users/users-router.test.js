const db = require('../../database/dbConfig');
const request = require('supertest');
const server = require('../../api/server');

// ------------------- REGISTER ENDPOINT ---------------------- //
describe('Users Router', function() {
    it('runs the tests', function() {
        expect(true).toBe(true)
    });
    describe('test environment', function() {
        it('should use the test environment', function() {
            expect(process.env.DB_ENV).toBe('testing')
        });
    });
    beforeEach(async function() {
        await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
    });
    describe('POST /api/users/register', function() {
        it ('should register a user', async function() {
            await request(server)
                .post('/api/users/register')
                .send({ 
                    user_name: 'user1', 
                    password: 'password'
                })
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                    expect(res.body).toEqual(expect.objectContaining({ user_name: 'user1' }));
                })
        });
        it ('should NOT register a user', async function() {
            await request(server)
                .post('/api/users/register')
                .send({ user_name: 'User2' })
                .expect(500)
                .then(res => {
                    expect(res.status).toBe(500);
                })
        });
    });
    describe('POST /api/users/login', function() {
        it ('should login a user', async function() {
            await request(server)
                .post('/api/users/register')
                .send({ user_name: 'User2', password: 'pass1234'})
            await request(server)
                .post('/api/users/login')
                .send({ user_name: 'User2', password: 'pass1234'})
                .expect(200);
            });
        it ('should NOT login a user', async function() {
            await request(server)
                .post('/api/users/login')
                .send({ user_name: 'User5', password: 'pass1234' })
                .expect(401);
        });
    });
});