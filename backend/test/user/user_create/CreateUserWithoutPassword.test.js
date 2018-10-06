const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateUserWithoutPassword', function () {
    it('POST /users/ without a field "password" must not create a user.', async () => {

        const createUserResponse = await fetch(SERVER + '/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": "name@mail.com",
                "firstName": "First name",
                "lastName": "Last name"
            })
        })
        // .then(res => res.json())         // If you want to print the JSON for debugging, uncomment 
        // .then(json => console.log(json)) // these two lines and comment the lines starting from 'const createUserResponseJson = await ...'
        ;

        const createUserResponseJson = await createUserResponse.json();
        expect(createUserResponseJson.status).to.be.equal(400);
        expect(createUserResponseJson.message).to.be.equal('The attribute "password" of an instance of "User" cannot be empty.');
    });
});