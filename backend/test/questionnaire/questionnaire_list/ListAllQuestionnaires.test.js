const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('ListAllQuestionnaires', function () {
    it('GET /questionnaires must list all questionnaires.', async () => {

        const response = await fetch(SERVER + '/questionnaires');
        expect(response.status).to.be.equal(200);

        const questionnaires = await response.json();
        expect(questionnaires).to.be.an('Array');
        for (let questionnaire of questionnaires) {
            expect(questionnaire).to.be.an('Object');
            expect(questionnaire.id).to.be.a('Number');
            expect(questionnaire.name).to.be.a('String');
            expect(questionnaire.description).to.be.a('String');
            expect(questionnaire.isPublic).to.be.a('Boolean');
        }
    });
});