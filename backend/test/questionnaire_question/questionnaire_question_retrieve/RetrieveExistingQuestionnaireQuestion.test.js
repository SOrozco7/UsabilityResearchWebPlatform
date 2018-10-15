const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('RetrieveExistingQuestionnaireQuestion', function () {
    it('GET /questionnairequestionss/:id with valid id must retrieve a questionnaire question.', async () => {

        const response = await fetch(SERVER + '/questionnairequestions' + '/1');
        expect(response.status).to.be.equal(200);

        const question = await response.json();
        expect(question).to.be.an('Object');
        expect(question.id).to.be.a('Number');
        expect(question.text).to.be.a('String');
        expect(question.questionnaire_id).to.be.a('Number');
    });
});