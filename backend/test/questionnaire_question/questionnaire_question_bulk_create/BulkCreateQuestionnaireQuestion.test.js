const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('BulkCreateQuestionnaireQuestion', () => {
  it('POST /questionnairequestions-bulk/ must create many questionnaire questions.', async () => {
    const bulkCreateQuestionResponse = await fetch(`${SERVER}/questionnairequestions-bulk/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionnairequestions: [
          {
            text: 'Test text',
            questionnaire_id: '2',
          },
          {
            text: 'Another test text',
            questionnaire_id: '2',
          },
          {
            text: 'A test text again',
            questionnaire_id: '2',
          },
        ],
      }),
    });
    const bulkCreateQuestionResponseJson = await bulkCreateQuestionResponse.json();
    expect(bulkCreateQuestionResponseJson.status).to.be.equal(201);
    expect(bulkCreateQuestionResponseJson.message).to.be.equal('Successfully created questionnaire questions.');

    // Retrieve all the questionnairequestions, and delete the last three.

    const listQuestionResponse = await fetch(`${SERVER}/questionnairequestions`);
    const questions = await listQuestionResponse.json();
    expect(questions).to.be.an('Array');
    expect(questions.length).to.be.at.least(3);
    const addedQuestions = questions.slice(questions.length - 3);
    expect(addedQuestions[0].text).to.be.equal('Test text');
    expect(addedQuestions[1].text).to.be.equal('Another test text');
    expect(addedQuestions[2].text).to.be.equal('A test text again');

    addedQuestions.forEach((question) => {
      fetch(`${SERVER}/questionnairequestions/${question.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  });
});
