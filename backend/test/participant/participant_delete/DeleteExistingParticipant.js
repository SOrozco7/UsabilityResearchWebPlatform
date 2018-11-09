const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('DeleteExistingParticipant', function () {
    it('DELETE /participants/:id must delete a participant.', async () => {

        const createParticipantResponse = await fetch(SERVER + '/participants/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                experiment_id: '2',
                name: 'Ali',
                age: '22',
                gender: 'Male',
                ethnicGroup: 'Arabic',
                educationLevel: 'PhD',
            })
        })
        // .then(res => res.json())         // If you want to print the JSON for debugging, uncomment 
        // .then(json => console.log(json)) // these two lines and comment the lines starting from 'const createExperimentResponseJson = await ...'
        ;

        const createParticipantResponseJson = await createParticipantResponse.json();
        const newParticipantId = createParticipantResponseJson.id;
        expect(createParticipantResponseJson.experiment_id).to.be.equal(2);
        expect(createParticipantResponseJson.name).to.be.equal('Ali');
        expect(createParticipantResponseJson.age).to.be.equal(22);
        expect(createParticipantResponseJson.gender).to.be.equal('Male');
        expect(createParticipantResponseJson.ethnicGroup).to.be.equal('Arabic');
        expect(createParticipantResponseJson.educationLevel).to.be.equal('PhD');

        // console.log("The participant with id " + newExperimentId + " was successfully created.");

        const deleteParticipantResponse = await fetch(SERVER + '/participants/' + newParticipantId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const deleteParticipantResponseJson = await deleteParticipantResponse.json();
        expect(deleteParticipantResponseJson.status).to.be.equal(200);

        // console.log("The participant with id " + newExperimentId + " was successfully deleted.");
    });
});