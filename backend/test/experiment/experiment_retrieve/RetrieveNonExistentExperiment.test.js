const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('RetrieveNonExistentExperiment', function () {
    it('GET /experiments/:id with an invalid id must not retrieve an experiment.', async () => {

        const response = await fetch(SERVER + '/experiments' + '/0');
        expect(response.status).to.be.equal(400);
    });
});