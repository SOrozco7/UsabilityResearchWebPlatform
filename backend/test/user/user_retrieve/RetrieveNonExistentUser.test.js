const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('RetrieveNonExistentUser', () => {
  it('GET /users/:id with an invalid id must not retrieve a user.', async () => {
    const retrieveUserResponse = await fetch(`${SERVER}/users/WRONG_EMAIL`);

    const retrieveUserResponseJson = await retrieveUserResponse.json();
    expect(retrieveUserResponseJson.status).to.be.equal(400);
    expect(retrieveUserResponseJson.message).to.be.equal('No user with that ID was found.');
  });
});
