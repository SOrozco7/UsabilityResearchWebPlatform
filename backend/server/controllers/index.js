const authentication = require('./authentication');
const experiments = require('./experiments');
const questions = require('./questions');
const questionResponses = require('./question-responses');
const users = require('./users');
const questionnaires = require('./questionnaires');
const questionnaireQuestions = require('./questionnaire-questions');
const questionnaireResponses = require('./questionnaire-responses');
const questionnaireQuestionResponses = require('./questionnaire-question-responses');
const participants = require('./participants');
const bodyParts = require('./bodyParts');

module.exports = {
  authentication,
  experiments,
  questions,
  questionResponses,
  users,
  questionnaireQuestions,
  questionnaireResponses,
  questionnaireQuestionResponses,
  questionnaires,
  participants,
  bodyParts,
};
