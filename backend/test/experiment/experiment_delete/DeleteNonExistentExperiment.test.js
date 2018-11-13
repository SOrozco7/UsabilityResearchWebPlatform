const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('DeleteNonExistentExperiment', () => {
  it('DELETE /experiments/:id with an invalid id must not delete an experiment.', async () => {
    const deleteExperimentResponse = await fetch(`${SERVER}/experiments/0`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deleteExperimentResponseJson = await deleteExperimentResponse.json();
    expect(deleteExperimentResponseJson.status).to.be.equal(400);
    expect(deleteExperimentResponseJson.message).to.be.equal('No experiment with that ID was found.');
  });
});
