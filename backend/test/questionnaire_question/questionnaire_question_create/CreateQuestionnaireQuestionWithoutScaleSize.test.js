const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('CreateQuestionnaireQuestionWithoutScaleSize', function () {
    it('POST /questionnairequestions/ without a field "scaleSize" must not create a questionnaire question.', async () => {

        const createQuestionResponse = await fetch(SERVER + '/questionnairequestions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "text": "Test text",
                "questionnaire_id": "2"
            })
        })
        // .then(res => res.json())         // If you want to print the JSON for debugging, uncomment 
        // .then(json => console.log(json)) // these two lines and comment the lines starting from 'const createQuestionResponseJson = await ...'
        ;

        const createQuestionResponseJson = await createQuestionResponse.json();
        expect(createQuestionResponseJson.status).to.be.equal(400);
        expect(createQuestionResponseJson.message).to.be.equal('The attribute "scaleSize" of an instance of "QuestionnaireQuestion" cannot be empty.');
    });
});