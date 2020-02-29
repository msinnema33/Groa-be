const db = require('../../database/dbConfig')
const USERS = require('./users-model')

describe('users-model', function() {
    describe('test environment', function() {
        it('should use the test environment', function() {
            expect(process.env.DB_ENV).toBe('testing')
        });
    });
    beforeEach(async function() {
        await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
    });
    describe('add()', function() {
        it('adds user to db', async function() {
            const user = await USERS.add({
                user_name: 'username', 
                password: 'password', 
            });
            expect(user.user_name).toBe('username')
            expect(user.id).toBe(1)
            const users = await db('users')
            expect(users).toHaveLength(1);
            expect(users[0]).toEqual(expect.objectContaining({id: 1}));
        });
    });
    describe('findBy(user_name)', function() {
        it('returns user by username', async function() {
            await db.seed.run();
            const user = await USERS.findBy('user2')
            expect(user.user_name).toBe('user2')
            expect(user.id).toBe(2)
        });
    });
    describe('getUserById(id)', function() {
        it('returns user by user id', async function() {
            await db.seed.run();
            const user = await USERS.getUserById(1)
            expect(user.user_name).toBe('user1')
            expect(user.id).toBe(1)
        });
    });
    describe('getUserRecommendations(id)', function() {
    });
    describe('findUsers()', function() {
        it('returns a list of all users and their id', async function() {
            await db.seed.run();
            const users = await USERS.findUsers();
            expect(users).toHaveLength(3);
        });
    });
    describe('findRatings()', function() {
        it('returns an array of all a users rated films', async function() {
            await db.seed.run()
        })
    })
})