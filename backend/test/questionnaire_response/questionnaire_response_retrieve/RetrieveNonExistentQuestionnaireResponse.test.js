const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('RetrieveNonExistentQuestionnaireResponse', function () {
    it('GET /questionnaireresponses/:id with an invalid id must not retrieve a questionnaire response.', async () => {

        const retrieveResponseResponse = await fetch(SERVER + '/questionnaireresponses' + '/0');        
        
        const retrieveResponseResponseJson = await retrieveResponseResponse.json();
        expect(retrieveResponseResponseJson.status).to.be.equal(400);
        expect(retrieveResponseResponseJson.message).to.be.equal("No questionnaire response with that ID was found.");
    });
});