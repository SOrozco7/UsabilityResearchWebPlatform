const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateQuestionnaireQuestionWithoutQuestionnaireID', () => {
  it('POST /questionnairequestions/ without a field "questionnaire_id" must not create a questionnaire question.', async () => {
    const createQuestionResponse = await fetch(`${SERVER}/questionnairequestions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'Test text',
      }),
    });

    const createQuestionResponseJson = await createQuestionResponse.json();
    expect(createQuestionResponseJson.status).to.be.equal(400);
    expect(createQuestionResponseJson.message).to.be.equal('The attribute "questionnaire_id" of an instance of "QuestionnaireQuestion" cannot be empty.');
  });
});
