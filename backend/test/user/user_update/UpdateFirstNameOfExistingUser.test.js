const expect = require('chai').expect;
const fetch = require('node-fetch');
const bcrypt = require('bcrypt-nodejs');

const SERVER = 'http://localhost:8000/api';

describe('UpdateFirstNameOfExistingUser', function () {
    it('PUT /users/:id with a valid id and a body only containing the field "firstName" must only update the first name of a user.', async () => {

        // Try to delete the user, in case it exists
        const tmpDeleteUserResponse = await fetch(SERVER + '/users/' + 'name@mail.com', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let plainTextPassword = "secret";

        const createUserResponse = await fetch(SERVER + '/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": "name@mail.com",
                "firstName": "First name",
                "lastName": "Last name",
                "password": plainTextPassword,
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
        
        // Compare the stored hash and the password provided by the user
        bcrypt.compare(plainTextPassword, createUserResponseJson.password, function(err, res) {
            
            expect(res).to.be.true;
        });

        // console.log("The user with id " + newUserId + " was successfully created.");

        const updateUserResponse = await fetch(SERVER + '/users/' + newUserId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "firstName": "First name 2",
            })
        });

        const updateUserResponseJson = await updateUserResponse.json();
        expect(updateUserResponseJson.firstName).to.be.equal("First name 2");
        expect(updateUserResponseJson.lastName).to.be.equal("Last name");
        
        // Compare the stored hash and the password provided by the user
        bcrypt.compare(plainTextPassword, createUserResponseJson.password, function(err, res) {
            
            expect(res).to.be.true;
        });

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