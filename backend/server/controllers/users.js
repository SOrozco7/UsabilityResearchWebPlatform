const User = require('../models').User;
const Experiment = require('../models').Experiment;
const bcrypt = require('bcrypt-nodejs');

module.exports = {

    //Method for listing users
    list(req, res) {

        return User
            .findAll( {

                // Include the experiments that each user owns
                include: [
                    {
                        model: Experiment,
                        as: 'experiments',
                        required: false,
                    }
                ],
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },

    //Method for retrieving a single user
    retrieve(req, res) {

        return User
            .findById(req.params.id, {

                // Include the experiments that this user owns
                include: [
                    {
                        model: Experiment,
                        as: 'experiments',
                        required: false,
                    }
                ],
            })
            .then(user => {

                if (!user) {

                    return res.status(404).send({

                        message: 'User Not Found.',
                    });
                }

                return res.status(200).send(user);
            })
            .catch(error => res.status(404).send(error));
    },
};