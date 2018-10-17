const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('RetrieveNonExistentQuestionnaireQuestion', () => {
  it('GET /questionnairequestions/:id with an invalid id must not retrieve a questionnaire question.', async () => {
    const retrieveQuestionResponse = await fetch(`${SERVER}/questionnairequestions/0`);

    const retrieveQuestionResponseJson = await retrieveQuestionResponse.json();
    expect(retrieveQuestionResponseJson.status).to.be.equal(400);
    expect(retrieveQuestionResponseJson.message).to.be.equal('No question with that ID was found.');
  });
});
