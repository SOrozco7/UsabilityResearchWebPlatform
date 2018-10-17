const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('ListAllQuestionnaireQuestions', () => {
  it('GET /questionnairequestions must list all questionnaire questions.', async () => {
    const response = await fetch(`${SERVER}/questionnairequestions`);
    expect(response.status).to.be.equal(200);

    const questions = await response.json();
    expect(questions).to.be.an('Array');
    questions.forEach((question) => {
      expect(question).to.be.an('Object');
      expect(question.id).to.be.a('Number');
      expect(question.text).to.be.a('String');
      expect(question.questionnaire_id).to.be.a('Number');
    });
  });
});
