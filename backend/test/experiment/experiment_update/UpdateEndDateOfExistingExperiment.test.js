const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('UpdateEndDateOfExistingExperiment', function () {
    it('PUT /experiments/:id with a valid id and a body only containing the field "endDate" must only update the endDate of an experiment.', async () => {

        const createExperimentResponse = await fetch(SERVER + '/experiments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": "Test name",
                "description": "Test description",
                "startDate": "2016-01-01",
                "endDate": "2017-01-01",
                "user_id": "danperez@gmail.com"
            })
        })
        // .then(res => res.json())         // If you want to print the JSON for debugging, uncomment 
        // .then(json => console.log(json)) // these two lines and comment the lines starting from 'const createExperimentResponseJson = await ...'
        ;

        const createExperimentResponseJson = await createExperimentResponse.json();
        const newExperimentId = createExperimentResponseJson.id;
        expect(createExperimentResponseJson.name).to.be.equal("Test name");
        expect(createExperimentResponseJson.description).to.be.equal("Test description");
        expect(createExperimentResponseJson.startDate).to.be.equal("2016-01-01");
        expect(createExperimentResponseJson.endDate).to.be.equal("2017-01-01");
        expect(createExperimentResponseJson.user_id).to.be.equal("danperez@gmail.com");

        // console.log("The experiment with id " + newExperimentId + " was successfully created.");

        const updateExperimentResponse = await fetch(SERVER + '/experiments/' + newExperimentId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "endDate": "2017-01-02",
            })
        });

        const updateExperimentResponseJson = await updateExperimentResponse.json();
        expect(updateExperimentResponseJson.name).to.be.equal("Test name");
        expect(updateExperimentResponseJson.description).to.be.equal("Test description");
        expect(updateExperimentResponseJson.startDate).to.be.equal("2016-01-01");
        expect(updateExperimentResponseJson.endDate).to.be.equal("2017-01-02");

        // console.log("The experiment with id " + newExperimentId + " was successfully updated.");

        const deleteExperimentResponse = await fetch(SERVER + '/experiments/' + newExperimentId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const deleteExperimentResponseJson = await deleteExperimentResponse.json();
        expect(deleteExperimentResponseJson.status).to.be.equal(200);

        // console.log("The experiment with id " + newExperimentId + " was successfully deleted.");
    });
});