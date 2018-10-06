const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('UpdatePasswordOfExistingUser', function () {
    it('PUT /users/:id with a valid id and a body only containing the field "password" must only update the password of a user.', async () => {

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
        expect(createUserResponseJson.id).to.be.equal("name@mail.com");
        expect(createUserResponseJson.username).to.be.equal("name@mail.com");
        expect(createUserResponseJson.firstName).to.be.equal("First name");
        expect(createUserResponseJson.lastName).to.be.equal("Last name");
        expect(createUserResponseJson.password).to.be.equal("secret");

        // console.log("The user with id " + newUserId + " was successfully created.");

        const updateUserResponse = await fetch(SERVER + '/users/' + newUserId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "password": "secret 2",
            })
        });

        const updateUserResponseJson = await updateUserResponse.json();
        expect(updateUserResponseJson.firstName).to.be.equal("First name");
        expect(updateUserResponseJson.lastName).to.be.equal("Last name");
        expect(updateUserResponseJson.password).to.be.equal("secret 2");

        // console.log("The user with id " + newUserId + " was successfully updated.");

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