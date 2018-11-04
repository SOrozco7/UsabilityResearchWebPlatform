const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateQuestionnaireQuestion', () => {
  it('POST /questionnairequestions/ must create a questoinnaire question.', async () => {
    const createQuestionResponse = await fetch(`${SERVER}/questionnairequestions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'Test text',
        questionnaire_id: '2',
      }),
    });

    const createQuestionResponseJson = await createQuestionResponse.json();
    const newQuestionId = createQuestionResponseJson.id;
    expect(createQuestionResponseJson.text).to.be.equal('Test text');
    expect(createQuestionResponseJson.questionnaire_id).to.be.equal(2);

    const deleteQuestionResponse = await fetch(`${SERVER}/questionnairequestions/${newQuestionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deleteQuestionResponseJson = await deleteQuestionResponse.json();
    expect(deleteQuestionResponseJson.status).to.be.equal(200);
  });
});
