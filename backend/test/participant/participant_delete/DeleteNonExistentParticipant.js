const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('DeleteNonExistentParticipant', function () {
    it('DELETE /participants/:id with an invalid id must not delete an participant.', async () => {

        const deleteParticipantResponse = await fetch(SERVER + '/participants/0', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const deleteParticipantResponseJson = await deleteParticipantResponse.json();
        expect(deleteParticipantResponseJson.status).to.be.equal(400);
        expect(deleteParticipantResponseJson.message).to.be.equal('No participant with that ID was found.');
    });
});