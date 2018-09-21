const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('RetrieveNonExistentExperiment', function () {
    it('GET /experiments/:id with an invalid id must not retrieve an experiment.', async () => {

        const retrieveExperimentResponse = await fetch(SERVER + '/experiments' + '/0');        
        
        const retrieveExperimentResponseJson = await retrieveExperimentResponse.json();
        expect(retrieveExperimentResponseJson.status).to.be.equal(400);
        expect(retrieveExperimentResponseJson.message).to.be.equal("No experiment with that ID was found.");
    });
});