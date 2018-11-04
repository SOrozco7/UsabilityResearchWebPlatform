const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('ListAllQuestionnaireResponses', () => {
  it('GET /questionnaireresponses must list all questionnaire responses.', async () => {
    const response = await fetch(`${SERVER}/questionnaireresponses`);
    expect(response.status).to.be.equal(200);

    const responses = await response.json();
    expect(responses).to.be.an('Array');
    responses.forEach((resp) => {
      expect(resp).to.be.an('Object');
      expect(resp.id).to.be.a('Number');
      expect(resp.participant_id).to.be.a('Number');
      expect(resp.questionnaire_id).to.be.a('Number');
    });
  });
});
