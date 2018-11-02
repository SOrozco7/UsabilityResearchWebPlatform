const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateParticipant', function () {
    it('POST /participants/ must create a participant.', async () => {

        const createParticipantResponse = await fetch(SERVER + '/participants/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "experiment_id": "2",
                "name": "Ali",
                "age": "22",
                "gender": "Male",
                "ethnicGroup": "Arabic",
                "educationLevel": "PhD"
            })
        })
        // .then(res => res.json())         // If you want to print the JSON for debugging, uncomment 
        // .then(json => console.log(json)) // these two lines and comment the lines starting from 'const createParticipantResponseJson = await ...'
        ;

        const createParticipantResponseJson = await createParticipantResponse.json();
        const newParticipantId = createParticipantResponseJson.id;
        expect(createParticipantResponseJson.experiment_id).to.be.equal(2);

        const deleteParticipantResponse = await fetch(SERVER + '/participants/' + newParticipantId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const deleteParticipantResponseJson = await deleteParticipantResponse.json();
        expect(deleteParticipantResponseJson.status).to.be.equal(200);
    });
});