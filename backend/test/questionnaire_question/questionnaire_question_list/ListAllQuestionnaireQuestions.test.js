const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('ListAllQuestionnaireQuestions', function () {
    it('GET /questionnairequestions must list all questionnaire questions.', async () => {

        const response = await fetch(SERVER + '/questionnairequestions');
        expect(response.status).to.be.equal(200);

        const questions = await response.json();
        expect(questions).to.be.an('Array');
        for (let question of questions) {
            expect(question).to.be.an('Object');
            expect(question.id).to.be.a('Number');
            expect(question.text).to.be.a('String');
            expect(question.questionnaire_id).to.be.a('Number');
        }
    });
});