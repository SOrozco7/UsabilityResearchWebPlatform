const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('RetrieveExistingQuestionnaireResponse', () => {
  it('GET /questionnaireresponses/:id with valid id must retrieve a questionnaire response.', async () => {
    const response = await fetch(`${SERVER}/questionnaireresponses/1`);
    expect(response.status).to.be.equal(200);

    const res = await response.json();
    expect(res).to.be.an('Object');
    expect(res.id).to.be.a('Number');
    expect(res.participant_id).to.be.a('Number');
    expect(res.questionnaire_id).to.be.a('Number');
  });
});
