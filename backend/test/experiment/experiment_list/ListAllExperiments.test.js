const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('ListAllExperiments', () => {
  it('GET /experiments must list all experiments.', async () => {
    const response = await fetch(`${SERVER}/experiments`);
    expect(response.status).to.be.equal(200);

    const experiments = await response.json();
    expect(experiments).to.be.an('Array');
    experiments.forEach((exp) => {
      expect(exp).to.be.an('Object');
      expect(exp.id).to.be.a('Number');
      expect(exp.name).to.be.a('String');
      expect(exp.description).to.be.a('String');
      expect(exp.startDate).to.be.a('String');
      expect(exp.endDate).to.be.a('String');
    });
  });
});
