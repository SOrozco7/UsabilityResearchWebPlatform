const authentication = require('./authentication');
const experiments = require('./experiments');
const users = require('./users');
const questionnaires = require('./questionnaires');
const questionnaireQuestions = require('./questionnaire-questions');
const questionnaireResponses = require('./questionnaire-responses');
const questionnaireQuestionResponses = require('./questionnaire-question-responses');
const participants = require('./participants');

module.exports = {
    authentication,
    experiments,
    users,
    questionnaireQuestions,
    questionnaires,
    questionnaireResponses,
    questionnaireQuestionResponses,
    questionnaires,
    participants
};