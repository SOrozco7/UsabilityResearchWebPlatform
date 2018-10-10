const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateQuestionnaireQuestionWithoutQuestionnaireID', function () {
    it('POST /questionnairequestions/ without a field "questionnaire_id" must not create a questionnaire question.', async () => {

        const createQuestionResponse = await fetch(SERVER + '/questionnairequestions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "text": "Test text",
                "scaleSize": "5",
            })
        })
        // .then(res => res.json())         // If you want to print the JSON for debugging, uncomment 
        // .then(json => console.log(json)) // these two lines and comment the lines starting from 'const createQuestionResponseJson = await ...'
        ;

        const createQuestionResponseJson = await createQuestionResponse.json();
        expect(createQuestionResponseJson.status).to.be.equal(400);
        expect(createQuestionResponseJson.message).to.be.equal('The attribute "questionnaire_id" of an instance of "QuestionnaireQuestion" cannot be empty.');
    });
});