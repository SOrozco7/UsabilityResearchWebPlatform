const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateExperimentWithoutName', () => {
  it('POST /experiments/ without a field "name" must not create an experiment.', async () => {
    const createExperimentResponse = await fetch(`${SERVER}/experiments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: 'Test description',
        startDate: '2016-01-01',
        endDate: '2017-01-01',
        user_id: 'danperez@gmail.com',
      }),
    });

    const createExperimentResponseJson = await createExperimentResponse.json();
    expect(createExperimentResponseJson.status).to.be.equal(400);
    expect(createExperimentResponseJson.message).to.be.equal('The attribute "name" of an instance of "Experiment" cannot be empty.');
  });
});
