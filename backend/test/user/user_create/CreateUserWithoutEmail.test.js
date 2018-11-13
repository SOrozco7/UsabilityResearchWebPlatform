const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateUserWithoutEmail', () => {
  it('POST /users/ without a field "email" must not create a user.', async () => {
    const createUserResponse = await fetch(`${SERVER}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'First name',
        lastName: 'Last name',
        password: 'secret',
      }),
    });

    const createUserResponseJson = await createUserResponse.json();
    expect(createUserResponseJson.status).to.be.equal(400);
    expect(createUserResponseJson.message).to.be.equal('The attribute "id" (email) of an instance of "User" cannot be empty.');
  });
});
