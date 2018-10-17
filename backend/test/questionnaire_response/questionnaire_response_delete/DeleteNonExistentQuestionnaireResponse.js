const { expect } = require('chai');
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('DeleteNonExistentQuestionnaireResponse', () => {
  it('DELETE /questionnaireresponses/:id with an invalid id must not delete a questionnaire response.', async () => {
    const deleteResponseResponse = await fetch(`${SERVER}/questionnaireresponses/0`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deleteResponseResponseJson = await deleteResponseResponse.json();
    expect(deleteResponseResponseJson.status).to.be.equal(400);
    expect(deleteResponseResponseJson.message).to.be.equal('No questionnaire response with that ID was found.');
  });
});
