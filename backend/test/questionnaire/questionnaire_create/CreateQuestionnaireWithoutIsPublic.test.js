const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateQuestionnaireWithoutIsPublic', function () {
    it('POST /questionnaires/ without a field "isPublic" must not create a questionnaire.', async () => {

        const createQuestionnaireResponse = await fetch(SERVER + '/questionnaires/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": "Test name",
                "description": "Test description",
                "user_id": "danperez@gmail.com",
            })
        })
        // .then(res => res.json())         // If you want to print the JSON for debugging, uncomment 
        // .then(json => console.log(json)) // these two lines and comment the lines starting from 'const createQuestionnaireResponseJson = await ...'
        ;

        const createQuestionnaireResponseJson = await createQuestionnaireResponse.json();

        expect(createQuestionnaireResponseJson.status).to.be.equal(400);
        expect(createQuestionnaireResponseJson.message).to.be.equal('The attribute "isPublic" of an instance of "Questionnaire" cannot be empty.');

    });
});