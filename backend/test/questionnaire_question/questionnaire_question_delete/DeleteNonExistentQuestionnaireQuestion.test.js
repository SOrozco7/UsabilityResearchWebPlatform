const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('DeleteNonExistentQuestionnaireQuestion', function () {
    it('DELETE /experiments/:id with an invalid id must not delete a questionnaire question.', async () => {

        const deleteQuestionResponse = await fetch(SERVER + '/questionnairequestions/' + 0, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const deleteQuestionResponseJson = await deleteQuestionResponse.json();
        expect(deleteQuestionResponseJson.status).to.be.equal(400);
        expect(deleteQuestionResponseJson.message).to.be.equal("No question with that ID was found.");
    });
});