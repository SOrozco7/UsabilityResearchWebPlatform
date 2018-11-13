const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateExperimentWithoutEndDate', () => {
  it('POST /experiments/ without a field "endDate" must not create an experiment.', async () => {
    const createExperimentResponse = await fetch(`${SERVER}/experiments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test name',
        description: 'Test description',
        startDate: '2016-01-01',
        user_id: 'danperez@gmail.com',
      }),
    });

    const createExperimentResponseJson = await createExperimentResponse.json();
    expect(createExperimentResponseJson.status).to.be.equal(400);
    expect(createExperimentResponseJson.message).to.be.equal('The attribute "endDate" of an instance of "Experiment" cannot be empty.');
  });
});
