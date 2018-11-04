const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('AddExistingQuestionnaireToExistingExperiment', () => {
  it('POST /experiments/:id/questionnaires with an existing questionnaire and existing experiment should add the questionnaire to the experiment.', async () => {
    // Create the experiment.
    const createExperimentResponse = await fetch(`${SERVER}/experiments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test name',
        description: 'Test description',
        startDate: '2017-01-01',
        endDate: '2018-01-01',
        user_id: 'danperez@gmail.com',
      }),
    });
    const createExperimentResponseJson = await createExperimentResponse.json();
    expect(createExperimentResponseJson.name).to.be.equal('Test name');

    // Create the questionnaire.
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

    // Add the questionnaire to the experiment.
    const addQuestionnaireResponse = await fetch(`${SERVER}/experiments/${createExperimentResponseJson.id}/questionnaires`, {
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
    expect(addQuestionnaireResponseJson.status).to.be.equal(200);
  });
});
