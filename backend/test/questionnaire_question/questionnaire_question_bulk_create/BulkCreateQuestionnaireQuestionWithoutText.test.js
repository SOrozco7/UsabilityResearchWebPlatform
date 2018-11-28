const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('BulkCreateQuestionnaireQuestionWithoutText', () => {
  it('POST /questionnairequestions-bulk/ without a field "text" in one of the request questions must not create any questionnaire questions.', async () => {
    const bulkCreateQuestionResponse = await fetch(`${SERVER}/questionnairequestions-bulk/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionnairequestions: [
          {
            text: 'Test text',
            questionnaire_id: '2',
          },
          {
            questionnaire_id: '2',
          },
          {
            text: 'A test text again',
            questionnaire_id: '2',
          },
        ],
      }),
    });
    const bulkCreateQuestionResponseJson = await bulkCreateQuestionResponse.json();
    expect(bulkCreateQuestionResponseJson.status).to.be.equal(400);
    expect(bulkCreateQuestionResponseJson.message).to.be.equal('The attribute "text" of an instance of "QuestionnaireQuestion" cannot be empty.');
  });
});
