const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('RetrieveNonExistentQuestionnaire', () => {
  it('GET /questionnaires/:id with an invalid id must not retrieve a questionnaire.', async () => {
    const retrieveQuestionnaireResponse = await fetch(`${SERVER}/questionnaires/0`);

    const retrieveQuestionnaireResponseJson = await retrieveQuestionnaireResponse.json();
    expect(retrieveQuestionnaireResponseJson.status).to.be.equal(400);
    expect(retrieveQuestionnaireResponseJson.message).to.be.equal('No questionnaire with that ID was found.');
  });
});
