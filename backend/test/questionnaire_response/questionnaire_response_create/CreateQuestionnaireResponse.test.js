const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateQuestionnaireResponse', () => {
  it('POST /questionnaireresponses/ must create a questionnaire response.', async () => {
    const createResponseResponse = await fetch(`${SERVER}/questionnaireresponses/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        participant_id: '2',
        questionnaire_id: '2',
      }),
    });

    const createResponseResponseJson = await createResponseResponse.json();
    const newResponseId = createResponseResponseJson.id;
    expect(createResponseResponseJson.participant_id).to.be.equal(2);
    expect(createResponseResponseJson.questionnaire_id).to.be.equal(2);

    const deleteResponseResponse = await fetch(`${SERVER}/questionnaireresponses/${newResponseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deleteResponseResponseJson = await deleteResponseResponse.json();
    expect(deleteResponseResponseJson.status).to.be.equal(200);
  });
});
