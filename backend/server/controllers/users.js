const User = require('../models').User;
const Experiment = require('../models').Experiment;
const bcrypt = require('bcrypt-nodejs');

module.exports = {

    //Method for listing users
    list(req, res) {

        return User
            .findAll( {

                // include: [
                //     {
                //         model: Experiment,
                //         as: 'experiments',
                //         through: {

                //             attributes: ['user_id'],
                //         },
                //         required: false,
                //         //Without this line of attributes, it fails!!
                //         attributes : ['id', 'name', 'description', 'startDate', 'endDate', 'createdAt', 'updatedAt', 'user_id']
                //     },
                // ],
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
};