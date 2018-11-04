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
        name: 'Ali',
        age: '22',
        gender: 'Male',
        ethnicGroup: 'Arabic',
        educationLevel: 'PhD',
      }),
    });

    const createParticipantResponseJson = await createParticipantResponse.json();
    const newParticipantId = createParticipantResponseJson.id;
    expect(createParticipantResponseJson.experiment_id).to.be.equal(2);
    expect(createParticipantResponseJson.name).to.be.equal('Ali');
    expect(createParticipantResponseJson.age).to.be.equal(22);
    expect(createParticipantResponseJson.gender).to.be.equal('Male');
    expect(createParticipantResponseJson.ethnicGroup).to.be.equal('Arabic');
    expect(createParticipantResponseJson.educationLevel).to.be.equal('PhD');

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
