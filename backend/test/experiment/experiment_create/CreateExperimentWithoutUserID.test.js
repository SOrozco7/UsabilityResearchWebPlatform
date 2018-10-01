const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateExperimentWithoutUserID', function () {
    it('POST /experiments/ without a field "user_id" must not create an experiment.', async () => {

        const createExperimentResponse = await fetch(SERVER + '/experiments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": "Test name",
                "description": "Test description",
                "startDate": "2016-01-01",
                "endDate": "2017-01-01"
            })
        })
        // .then(res => res.json())         // If you want to print the JSON for debugging, uncomment 
        // .then(json => console.log(json)) // these two lines and comment the lines starting from 'const createExperimentResponseJson = await ...'
        ;

        const createExperimentResponseJson = await createExperimentResponse.json();
        expect(createExperimentResponseJson.status).to.be.equal(400);
        expect(createExperimentResponseJson.message).to.be.equal('The attribute "user_id" of an instance of "Experiment" cannot be empty.');
    });
});