const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('ListAllUsers', function () {
    it('GET /users must list all users.', async () => {

        const response = await fetch(SERVER + '/users');
        expect(response.status).to.be.equal(200);

        const users = await response.json();
        expect(users).to.be.an('Array');
        for (let user of users) {
            expect(user).to.be.an('Object');
            expect(user.id).to.be.a('String');
            expect(user.username).to.be.a('String');
            expect(user.firstName).to.be.a('String');
            expect(user.lastName).to.be.a('String');
            expect(user.password).to.be.a('String');
        }
    });
});