const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('UpdateNonExistentQuestionnaire', function () {
    it('PUT /questionnaires/:id with an invalid id must not update a questionnaire.', async () => {

        const updateQuestionnaireResponse = await fetch(SERVER + '/questionnaires/' + 0, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": "Test name 2",
                "description": "Test description 2",
                "user_id": "danperez@gmail.com",
                "isPublic": "true"
            })
        });

        const updateQuestionnaireResponseJson = await updateQuestionnaireResponse.json();
        expect(updateQuestionnaireResponseJson.status).to.be.equal(400);
        expect(updateQuestionnaireResponseJson.message).to.be.equal('No questionnaire with that ID was found.');

    });
});