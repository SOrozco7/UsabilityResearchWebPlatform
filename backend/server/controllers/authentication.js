const bcrypt = require('bcrypt-nodejs');
const { User } = require('../models');
const jwt = require('../services/jwt');

module.exports = {
  login(req, res) { // eslint-disable-line consistent-return
    // check that params are not null, undefined or empty string
    if (!req.body.user_id || !req.body.password) {
      return res.status(400).send({ message: 'The post body must contain a user_id and password field.' });
    }

    const userId = (String)(req.body.user_id);
    const requestPassword = req.body.password;

    User.findById(userId)
      .then((user) => { // eslint-disable-line consistent-return
        if (!user) {
          return res.status(400).send({ message: 'Authentication failed. User not found.' });
        }

        // if(!user.confirmed){
        //     return res.status(400).send(
        //  {
        //    message: 'Authentication failed. The account is not
        //    confirmed, check your email to confirm your account.'}
        //  );
        // }

        bcrypt.compare(requestPassword, user.password, (error, check) => {
          if (check) {
            const data = jwt.createToken(user);
            const returnedUser = user;
            returnedUser.password = '';

            return res.status(200).send({
              token: data.token,
              returnedUser,
              expirationTime: data.expirationTime,
            });
          }

          return res.status(400).send({ message: 'Incorrect password.' });
        });
      })
      .catch(() => res.status(400).send({ message: 'Request error.' }));
  },
};
