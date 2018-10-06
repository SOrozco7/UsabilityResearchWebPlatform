const authMiddleware = require('../middlewares/authentication');

const usersController = require('../controllers').users;
const experimentsController = require('../controllers').experiments;
const authenticationController = require('../controllers').authentication;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the GestureWeb Project API!',
  }));

  // Authentication routes
  app.post('/api/login', authenticationController.login);

  //Routes for the USERS table
  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.list);
  // app.get('/api/users/confirm/:uuid', usersController.confirm);
  app.get('/api/users/:id', usersController.retrieve);
  app.put('/api/users/:id', usersController.update);
  app.delete('/api/users/:id', usersController.destroy);

  //Routes for the EXPERIMENTS table
  app.post('/api/experiments', experimentsController.create);  
  app.get('/api/experiments', experimentsController.list);
  app.get('/api/experiments/:id', experimentsController.retrieve);
  app.put('/api/experiments/:id', experimentsController.update);
  app.delete('/api/experiments/:id', experimentsController.destroy);
};