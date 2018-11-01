const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('AddExistingQuestionnaireToNonExistentExperiment', () => {
  it('POST /experiments/:id/questionnaires with an existing questionnaire and nonexisting experiment should not add the questionnaire to the experiment.', async () => {
    const createQuestionnaireResponse = await fetch(`${SERVER}/questionnaires/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test name',
        description: 'Test description',
        user_id: 'danperez@gmail.com',
        isPublic: 'true',
        scaleSize: '3',
      }),
    });
    const createQuestionnaireResponseJson = await createQuestionnaireResponse.json();
    expect(createQuestionnaireResponseJson.name).to.be.equal('Test name');

    const addQuestionnaireResponse = await fetch(`${SERVER}/experiments/0/questionnaires`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionnaire: {
          id: createQuestionnaireResponseJson.id,
        },
      }),
    });
    const addQuestionnaireResponseJson = await addQuestionnaireResponse.json();
    expect(addQuestionnaireResponseJson.status).to.be.equal(400);
    expect(addQuestionnaireResponseJson.message).to.be.equal('No experiment with that ID was found.');
  });
});
