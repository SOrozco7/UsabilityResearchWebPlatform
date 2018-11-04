const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateQuestionnaireQuestionWithoutText', () => {
  it('POST /questionnairequestions/ without a field "text" must not create a questionnaire question.', async () => {
    const createQuestionResponse = await fetch(`${SERVER}/questionnairequestions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionnaire_id: '2',
      }),
    });

    const createQuestionResponseJson = await createQuestionResponse.json();
    expect(createQuestionResponseJson.status).to.be.equal(400);
    expect(createQuestionResponseJson.message).to.be.equal('The attribute "text" of an instance of "QuestionnaireQuestion" cannot be empty.');
  });
});
