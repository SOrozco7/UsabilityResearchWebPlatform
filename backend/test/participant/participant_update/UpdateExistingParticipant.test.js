const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('UpdateExistingParticipant', () => {
  it('PUT /participants/:id with a valid id and a body containing all fields that can be updated must update each of those fields of a participant.', async () => {
    const createParticipantResponse = await fetch(`${SERVER}/participants/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        experiment_id: 2,
        name: 'Ali',
        age: 22,
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

    const updateParticipantResponse = await fetch(`${SERVER}/participants/${newParticipantId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        experiment_id: 2,
        name: 'Alizz',
        age: 23,
        gender: 'Female',
        ethnicGroup: 'Persian',
        educationLevel: 'Bachelor\'s degree',
      }),
    });

    const updateParticipantResponseJson = await updateParticipantResponse.json();
    expect(updateParticipantResponseJson.experiment_id).to.be.equal(2);
    expect(updateParticipantResponseJson.name).to.be.equal('Alizz');
    expect(updateParticipantResponseJson.age).to.be.equal(23);
    expect(updateParticipantResponseJson.gender).to.be.equal('Female');
    expect(updateParticipantResponseJson.ethnicGroup).to.be.equal('Persian');
    expect(updateParticipantResponseJson.educationLevel).to.be.equal('Bachelor\'s degree');

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
