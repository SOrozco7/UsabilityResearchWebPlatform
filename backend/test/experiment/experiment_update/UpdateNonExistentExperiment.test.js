const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('UpdateNonExistentExperiment', () => {
  it('PUT /experiments/:id with an invalid id must not update an experiment.', async () => {
    const updateExperimentResponse = await fetch(`${SERVER}/experiments/${0}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test name 2',
        description: 'Test description 2',
        startDate: '2016-01-02',
        endDate: '2017-01-02',
        user_id: 'danperez@gmail.com',
      }),
    });

    const updateExperimentResponseJson = await updateExperimentResponse.json();
    expect(updateExperimentResponseJson.status).to.be.equal(400);
    expect(updateExperimentResponseJson.message).to.be.equal('No experiment with that ID was found.');
  });
});
