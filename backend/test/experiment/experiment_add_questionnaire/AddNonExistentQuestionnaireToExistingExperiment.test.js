const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('AddNonExistentQuestionnaireToExistingExperiment', () => {
  it('POST /experiments/:id/addQuestionnaire with a nonexistent questionnaire and existing experiment should not add the questionnaire to the experiment.', async () => {
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

    const addQuestionnaireResponse = await fetch(`${SERVER}/experiments/${createExperimentResponseJson.id}/addQuestionnaire`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionnaire: {
          id: '0',
        },
      }),
    });
    const addQuestionnaireResponseJson = await addQuestionnaireResponse.json();
    expect(addQuestionnaireResponseJson.status).to.be.equal(400);
    expect(addQuestionnaireResponseJson.message).to.be.equal('No questionnaire with that ID was found.');
  });
});
