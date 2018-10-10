const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateExperimentWithoutDescription', function () {
    it('POST /experiments/ without a field "description" must not create an experiment.', async () => {

        const createExperimentResponse = await fetch(SERVER + '/experiments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": "Test name",
                "startDate": "2016-01-01",
                "endDate": "2017-01-01",
                "user_id": "danperez@gmail.com"
            })
        })
        // .then(res => res.json())         // If you want to print the JSON for debugging, uncomment 
        // .then(json => console.log(json)) // these two lines and comment the lines starting from 'const createExperimentResponseJson = await ...'
        ;

        const createExperimentResponseJson = await createExperimentResponse.json();
        expect(createExperimentResponseJson.status).to.be.equal(400);
        expect(createExperimentResponseJson.message).to.be.equal('The attribute "description" of an instance of "Experiment" cannot be empty.');
    });
});