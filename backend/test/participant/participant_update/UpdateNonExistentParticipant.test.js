const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('UpdateNonExistentParticipant', () => {
  it('PUT /participant/:id with an invalid id must not update a participant.', async () => {
    const updateParticipantResponse = await fetch(`${SERVER}/participants/${0}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        experiment_id: '2',
      }),
    });

    const updateParticipantResponseJson = await updateParticipantResponse.json();
    expect(updateParticipantResponseJson.status).to.be.equal(400);
    expect(updateParticipantResponseJson.message).to.be.equal('No participant with that ID was found.');
  });
});
