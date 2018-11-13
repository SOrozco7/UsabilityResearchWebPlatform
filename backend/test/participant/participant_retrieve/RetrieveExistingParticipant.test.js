const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('RetrieveExistingParticipant', () => {
  it('GET /participants/:id with valid id must retrieve a participant.', async () => {
    const response = await fetch(`${SERVER}/participants/1`);
    expect(response.status).to.be.equal(200);

    const participant = await response.json();
    expect(participant).to.be.an('Object');
    expect(participant.id).to.be.a('Number');
    expect(participant.experiment_id).to.be.a('Number');
  });
});
