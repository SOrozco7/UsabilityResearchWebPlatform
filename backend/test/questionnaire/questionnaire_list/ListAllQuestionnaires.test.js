const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('ListAllQuestionnaires', () => {
  it('GET /questionnaires must list all questionnaires.', async () => {
    const response = await fetch(`${SERVER}/questionnaires`);
    expect(response.status).to.be.equal(200);

    const questionnaires = await response.json();
    expect(questionnaires).to.be.an('Array');
    questionnaires.forEach((questionnaire) => {
      expect(questionnaire).to.be.an('Object');
      expect(questionnaire.id).to.be.a('Number');
      expect(questionnaire.name).to.be.a('String');
      expect(questionnaire.description).to.be.a('String');
      expect(questionnaire.isPublic).to.be.a('Boolean');
      expect(questionnaire.scaleSize).to.be.a('Number');
    });
  });
});
