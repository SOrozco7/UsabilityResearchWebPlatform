const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateUser', function () {
    it('POST /users/ must create a user.', async () => {

        // Try to delete the user, in case it exists
        const tmpDeleteUserResponse = await fetch(SERVER + '/users/' + 'name@mail.com', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const createUserResponse = await fetch(SERVER + '/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": "name@mail.com",
                "firstName": "First name",
                "lastName": "Last name",
                "password": "secret",
            })
        })
        // .then(res => res.json())         // If you want to print the JSON for debugging, uncomment 
        // .then(json => console.log(json)) // these two lines and comment the lines starting from 'const createUserResponseJson = await ...'
        ;

        const createUserResponseJson = await createUserResponse.json();
        const newUserId = createUserResponseJson.id;
        // We're using the email as both the id and the username
        expect(createUserResponseJson.id).to.be.equal("name@mail.com");
        expect(createUserResponseJson.username).to.be.equal("name@mail.com");
        expect(createUserResponseJson.firstName).to.be.equal("First name");
        expect(createUserResponseJson.lastName).to.be.equal("Last name");
        expect(createUserResponseJson.password).to.be.equal("secret");

        // console.log("The user with id " + newUserId + " was successfully created.");

        const deleteUserResponse = await fetch(SERVER + '/users/' + newUserId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const deleteUserResponseJson = await deleteUserResponse.json();
        expect(deleteUserResponseJson.status).to.be.equal(200);

        // console.log("The user with id " + newUserId + " was successfully deleted.");
    });
});