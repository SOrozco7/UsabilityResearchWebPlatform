const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('RetrieveExistingQuestionnaire', () => {
  it('GET /questionnaires/:id with valid id must retrieve a questionnaire.', async () => {
    const response = await fetch(`${SERVER}/questionnaires/1`);
    expect(response.status).to.be.equal(200);

    const questionnaire = await response.json();
    expect(questionnaire).to.be.an('Object');
    expect(questionnaire.id).to.be.a('Number');
    expect(questionnaire.name).to.be.a('String');
    expect(questionnaire.description).to.be.a('String');
    expect(questionnaire.isPublic).to.be.a('Boolean');
    expect(questionnaire.scaleSize).to.be.a('Number');
  });
});
