const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('RetrieveNonExistentParticipant', () => {
  it('GET /participants/:id with an invalid id must not retrieve a participant.', async () => {
    const retrieveParticipantResponse = await fetch(`${SERVER}/participants/0`);

    const retrieveParticipantResponseJson = await retrieveParticipantResponse.json();
    expect(retrieveParticipantResponseJson.status).to.be.equal(400);
    expect(retrieveParticipantResponseJson.message).to.be.equal('No participant with that ID was found.');
  });
});
