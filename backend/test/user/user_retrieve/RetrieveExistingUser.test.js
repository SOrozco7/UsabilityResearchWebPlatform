const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('RetrieveExistingUser', function () {
    it('GET /users/:id with valid id must retrieve a user.', async () => {

        const response = await fetch(SERVER + '/users' + '/danperez@gmail.com');
        expect(response.status).to.be.equal(200);

        const user = await response.json();
        expect(user).to.be.an('Object');
        expect(user.id).to.be.a('String');
        expect(user.username).to.be.a('String');
        expect(user.firstName).to.be.a('String');
        expect(user.lastName).to.be.a('String');
        expect(user.password).to.be.a('String');
    });
});