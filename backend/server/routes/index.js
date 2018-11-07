const usersController = require('../controllers').users;
const experimentsController = require('../controllers').experiments;
const authenticationController = require('../controllers').authentication;
const questionnairesController = require('../controllers').questionnaires;
const questionnaireQuestionsController = require('../controllers').questionnaireQuestions;
const questionnaireResponsesController = require('../controllers').questionnaireResponses;
const questionnaireQuestionResponsesController = require('../controllers').questionnaireQuestionResponses;
const participantsController = require('../controllers').participants;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the GestureWeb Project API!',
  }));

  // Authentication routes
  app.post('/api/login', authenticationController.login);

  // Routes for the USERS table
  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.list);
  // app.get('/api/users/confirm/:uuid', usersController.confirm);
  app.get('/api/users/:id', usersController.retrieve);
  app.put('/api/users/:id', usersController.update);
  app.delete('/api/users/:id', usersController.destroy);

  // Routes for the EXPERIMENTS table
  app.post('/api/experiments', experimentsController.create);
  app.get('/api/experiments', experimentsController.list);
  app.get('/api/experiments/:id', experimentsController.retrieve);
  app.put('/api/experiments/:id', experimentsController.update);
  app.delete('/api/experiments/:id', experimentsController.destroy);
  app.post('/api/experiments/:id/questionnaires', experimentsController.addQuestionnaire);

  // Routes for the QUESTIONNAIRES table
  app.post('/api/questionnaires', questionnairesController.create);
  app.get('/api/questionnaires', questionnairesController.list);
  app.get('/api/questionnaires/:id', questionnairesController.retrieve);
  app.put('/api/questionnaires/:id', questionnairesController.update);
  app.delete('/api/questionnaires/:id', questionnairesController.destroy);

  // Routes for the QUESTIONNAIREQUESTIONS table
  app.post('/api/questionnairequestions', questionnaireQuestionsController.create);
  app.post('/api/questionnairequestions-bulk', questionnaireQuestionsController.bulkCreate);
  app.get('/api/questionnairequestions', questionnaireQuestionsController.list);
  app.get('/api/questionnairequestions/:id', questionnaireQuestionsController.retrieve);
  app.put('/api/questionnairequestions/:id', questionnaireQuestionsController.update);
  app.delete('/api/questionnairequestions/:id', questionnaireQuestionsController.destroy);

  // Routes for the QUESTIONNAIRESPONSES table
  app.post('/api/questionnaireresponses', questionnaireResponsesController.create);
  app.get('/api/questionnaireresponses', questionnaireResponsesController.list);
  app.get('/api/questionnaireresponses/:id', questionnaireResponsesController.retrieve);
  app.delete('/api/questionnaireresponses/:id', questionnaireResponsesController.destroy);

  // Routes for the QUESTIONNAIREQUESTIONRESPONSES table
  app.post('/api/questionnairequestionresponses', questionnaireQuestionResponsesController.create);

  // Routes for the PARTICIPANTS table
  app.post('/api/participants', participantsController.create);
  app.get('/api/participants', participantsController.list);
  app.get('/api/participants/:id', participantsController.retrieve);
  app.put('/api/participants/:id', participantsController.update);
  app.delete('/api/participants/:id', participantsController.destroy);

  // Routes for the bodyParts
  // app.post('/api/bodyParts', bodyPartsController.create);
};
