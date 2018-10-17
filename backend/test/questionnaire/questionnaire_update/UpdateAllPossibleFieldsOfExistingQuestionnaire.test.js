const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('UpdateAllPossibleFieldsOfExistingQuestionnaire', () => {
  it('PUT /questionnaires/:id with a valid id and a body containing all fields that can be updated must update each of those fields of an questionnaire.', async () => {
    const createQuestionnaireResponse = await fetch(`${SERVER}/questionnaires/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test name',
        description: 'Test description',
        user_id: 'danperez@gmail.com',
        isPublic: 'false',
        scaleSize: '3',
      }),
    });

    const createQuestionnaireResponseJson = await createQuestionnaireResponse.json();
    const newQuestionnaireId = createQuestionnaireResponseJson.id;
    expect(createQuestionnaireResponseJson.name).to.be.equal('Test name');
    expect(createQuestionnaireResponseJson.description).to.be.equal('Test description');
    expect(createQuestionnaireResponseJson.user_id).to.be.equal('danperez@gmail.com');
    expect(createQuestionnaireResponseJson.isPublic).to.be.equal(false);
    expect(createQuestionnaireResponseJson.scaleSize).to.be.equal(3);

    const updateQuestionnaireResponse = await fetch(`${SERVER}/questionnaires/${newQuestionnaireId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test name 2',
        description: 'Test description 2',
        user_id: 'danperez@gmail.com',
        isPublic: 'true',
        scaleSize: '4',
      }),
    });

    const updateQuestionnaireResponseJson = await updateQuestionnaireResponse.json();
    expect(updateQuestionnaireResponseJson.name).to.be.equal('Test name 2');
    expect(updateQuestionnaireResponseJson.description).to.be.equal('Test description 2');
    expect(updateQuestionnaireResponseJson.isPublic).to.be.equal(true);
    expect(updateQuestionnaireResponseJson.scaleSize).to.be.equal('4');

    const deleteQuestionnaireResponse = await fetch(`${SERVER}/questionnaires/${newQuestionnaireId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deleteQuestionnaireResponseJson = await deleteQuestionnaireResponse.json();
    expect(deleteQuestionnaireResponseJson.status).to.be.equal(200);
  });
});
