const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateExperiment', () => {
  it('POST /experiments/ must create an experiment.', async () => {
    const createExperimentResponse = await fetch(`${SERVER}/experiments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test name',
        description: 'Test description',
        startDate: '2016-01-01',
        endDate: '2017-01-01',
        user_id: 'danperez@gmail.com',
      }),
    });

    const createExperimentResponseJson = await createExperimentResponse.json();
    const newExperimentId = createExperimentResponseJson.id;
    expect(createExperimentResponseJson.name).to.be.equal('Test name');
    expect(createExperimentResponseJson.description).to.be.equal('Test description');
    expect(createExperimentResponseJson.startDate).to.be.equal('2016-01-01');
    expect(createExperimentResponseJson.endDate).to.be.equal('2017-01-01');
    expect(createExperimentResponseJson.user_id).to.be.equal('danperez@gmail.com');

    const deleteExperimentResponse = await fetch(`${SERVER}/experiments/${newExperimentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deleteExperimentResponseJson = await deleteExperimentResponse.json();
    expect(deleteExperimentResponseJson.status).to.be.equal(200);
  });
});
