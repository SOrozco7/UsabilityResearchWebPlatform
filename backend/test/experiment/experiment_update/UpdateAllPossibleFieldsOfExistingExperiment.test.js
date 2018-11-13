const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('UpdateAllPossibleFieldsOfExistingExperiment', () => {
  it('PUT /experiments/:id with a valid id and a body containing all fields that can be updated must update each of those fields of an experiment.', async () => {
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

    const updateExperimentResponse = await fetch(`${SERVER}/experiments/${newExperimentId}`, {
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
    expect(updateExperimentResponseJson.name).to.be.equal('Test name 2');
    expect(updateExperimentResponseJson.description).to.be.equal('Test description 2');
    expect(updateExperimentResponseJson.startDate).to.be.equal('2016-01-02');
    expect(updateExperimentResponseJson.endDate).to.be.equal('2017-01-02');

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
