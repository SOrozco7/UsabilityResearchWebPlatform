const expect = require('chai').expect;
const fetch = require('node-fetch');

const SERVER = 'http://localhost:8000/api';

describe('ListAllParticipants', function () {
    it('GET /participants must list all participants.', async () => {

        const response = await fetch(SERVER + '/participants');
        expect(response.status).to.be.equal(200);

        const participants = await response.json();
        expect(participants).to.be.an('Array');
        for (let participant of participants) {
            expect(participant).to.be.an('Object');
            expect(participant.id).to.be.a('Number');
            expect(participant.experiment_id).to.be.a('Number');
        }
    });
}); 