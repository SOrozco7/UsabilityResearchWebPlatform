const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateQuestionnaire', function () {
    it('POST /questionnaires/ must create a questionnaire.', async () => {

        const createQuestionnaireResponse = await fetch(SERVER + '/questionnaires/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": "Test name",
                "description": "Test description",
                "user_id": "danperez@gmail.com",
                "isPublic": "true"
            })
        })
        // .then(res => res.json())         // If you want to print the JSON for debugging, uncomment 
        // .then(json => console.log(json)) // these two lines and comment the lines starting from 'const createQuestionnaireResponseJson = await ...'
        ;

        const createQuestionnaireResponseJson = await createQuestionnaireResponse.json();
        const newQuestionnaireId = createQuestionnaireResponseJson.id;
        expect(createQuestionnaireResponseJson.name).to.be.equal("Test name");
        expect(createQuestionnaireResponseJson.description).to.be.equal("Test description");
        expect(createQuestionnaireResponseJson.user_id).to.be.equal("danperez@gmail.com");
        expect(createQuestionnaireResponseJson.isPublic).to.be.equal(true);

        const deleteQuestionnaireResponse = await fetch(SERVER + '/questionnaires/' + newQuestionnaireId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const deleteQuestionnaireResponseJson = await deleteQuestionnaireResponse.json();
        expect(deleteQuestionnaireResponseJson.status).to.be.equal(200);
    });
});