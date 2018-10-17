const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateParticipant', () => {
  it('POST /participants/ must create a participant.', async () => {
    const createParticipantResponse = await fetch(`${SERVER}/participants/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        experiment_id: '2',
      }),
    });

    const createParticipantResponseJson = await createParticipantResponse.json();
    const newParticipantId = createParticipantResponseJson.id;
    expect(createParticipantResponseJson.experiment_id).to.be.equal(2);

    const deleteParticipantResponse = await fetch(`${SERVER}/participants/${newParticipantId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deleteParticipantResponseJson = await deleteParticipantResponse.json();
    expect(deleteParticipantResponseJson.status).to.be.equal(200);
  });
});
