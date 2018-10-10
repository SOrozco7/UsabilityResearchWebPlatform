const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('DeleteNonExistentUser', function () {
    it('DELETE /users/:id with an invalid id must not delete a user.', async () => {

        const deleteUserResponse = await fetch(SERVER + '/users/' + 'WRONG_EMAIL', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const deleteUserResponseJson = await deleteUserResponse.json();
        expect(deleteUserResponseJson.status).to.be.equal(400);
        expect(deleteUserResponseJson.message).to.be.equal("No user with that ID was found.");
    });
});