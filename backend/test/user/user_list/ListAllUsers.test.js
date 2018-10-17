const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('ListAllUsers', () => {
  it('GET /users must list all users.', async () => {
    const response = await fetch(`${SERVER}/users`);
    expect(response.status).to.be.equal(200);

    const users = await response.json();
    expect(users).to.be.an('Array');
    users.forEach((user) => {
      expect(user).to.be.an('Object');
      expect(user.id).to.be.a('String');
      expect(user.username).to.be.a('String');
      expect(user.firstName).to.be.a('String');
      expect(user.lastName).to.be.a('String');
      expect(user.password).to.be.a('String');
    });
  });
});
