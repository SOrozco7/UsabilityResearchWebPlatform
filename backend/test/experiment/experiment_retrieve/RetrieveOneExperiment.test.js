const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('Experiments.Retrieve', function () {
    it('GET /experiments/1 must retrieve one experiment', async () => {

        const response = await fetch(SERVER + '/experiments' + '/1');
        expect(response.status).to.be.equal(200);

        const experiment = await response.json();
        expect(experiment).to.be.an('Object');
        expect(experiment.id).to.be.a('Number');
        expect(experiment.name).to.be.a('String');
        expect(experiment.description).to.be.a('String');
        expect(experiment.startDate).to.be.a('String');
        expect(experiment.endDate).to.be.a('String');
    });
});