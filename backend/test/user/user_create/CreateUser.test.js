const { expect } = require('chai');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt-nodejs');

const SERVER = 'http://localhost:8000/api';

describe('CreateUser', () => {
  it('POST /users/ must create a user.', async () => {
    const plainTextPassword = 'secret';

    const createUserResponse = await fetch(`${SERVER}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 'name@mail.com',
        firstName: 'First name',
        lastName: 'Last name',
        password: plainTextPassword,
      }),
    });

    const createUserResponseJson = await createUserResponse.json();
    const newUserId = createUserResponseJson.id;
    // We're using the email as both the id and the username
    expect(createUserResponseJson.id).to.be.equal('name@mail.com');
    expect(createUserResponseJson.username).to.be.equal('name@mail.com');
    expect(createUserResponseJson.firstName).to.be.equal('First name');
    expect(createUserResponseJson.lastName).to.be.equal('Last name');

    // Compare the stored hash and the password provided by the user
    bcrypt.compare(plainTextPassword, createUserResponseJson.password,
      (err, res) => expect(res).to.be.true);

    const deleteUserResponse = await fetch(`${SERVER}/users/${newUserId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deleteUserResponseJson = await deleteUserResponse.json();
    expect(deleteUserResponseJson.status).to.be.equal(200);
  });
});
