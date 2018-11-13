const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateQuestionnaireWithoutDescription', () => {
  it('POST /questionnaires/ without a field "description" must not create a questionnaire.', async () => {
    const createQuestionnaireResponse = await fetch(`${SERVER}/questionnaires/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test name',
        user_id: 'danperez@gmail.com',
        isPublic: 'false',
        scaleSize: '3',
      }),
    });

    const createQuestionnaireResponseJson = await createQuestionnaireResponse.json();

    expect(createQuestionnaireResponseJson.status).to.be.equal(400);
    expect(createQuestionnaireResponseJson.message).to.be.equal('The attribute "description" of an instance of "Questionnaire" cannot be empty.');
  });
});
