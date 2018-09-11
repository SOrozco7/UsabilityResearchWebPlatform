const authMiddleware = require('../middlewares/authentication');

// const usersController = require('../controllers').;
const authenticationController = require('../controllers').authentication;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the GestureWeb Project API!',
  }));

  // Authentication routes
  app.post('/api/login', authenticationController.login);

  //Routes for the USERS table
  // app.post('/api/users', usersController.create);
  // app.get('/api/users', usersController.list);
  // app.get('/api/users/confirm/:uuid', usersController.confirm);
  // app.get('/api/users/:id', usersController.retrieve);
  // app.put('/api/users/:id', usersController.update);
  // app.delete('/api/users/:id', usersController.destroy);
};