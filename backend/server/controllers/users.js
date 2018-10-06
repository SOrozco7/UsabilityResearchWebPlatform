const User = require('../models').User;
const Experiment = require('../models').Experiment;
const bcrypt = require('bcrypt-nodejs');

module.exports = {

    create(req, res) {

        if(!req.body.username){
            return res.status(400).send({
                status: 400,
                message: 'The attribute "username" of an instance of "User" cannot be empty.'
            });
        }

        if(!req.body.firstName){
            return res.status(400).send({
                status: 400,
                message: 'The attribute "firstName" of an instance of "User" cannot be empty.'
            });
        }

        if(!req.body.lastName){
            return res.status(400).send({
                status: 400,
                message: 'The attribute "lastName" of an instance of "User" cannot be empty.'
            });
        }

        if(!req.body.password){
            return res.status(400).send({
                status: 400,
                message: 'The attribute "password" of an instance of "User" cannot be empty.'
            });
        }

        return User
            .create({
                id: req.body.email, // We're using the email as both the id and the username
                username: req.body.email, 
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },

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

    update(req, res){

        return User
            .findById(req.params.id, {
                attributes: ['id', 'username', 'firstName', 'lastName', 'password', 'createdAt', 'updatedAt']
            })
            .then(user => {

                if(!user) {
                    return res.status(400).send({

                        status: 400,
                        message: 'No user with that ID was found.'
                    });
                } 

                return User
                    .update({

                        // Don't let it update the email that corresponds to the user id and the username
                        firstName: req.body.firstName || user.firstName,
                        lastName: req.body.lastName || user.lastName,
                        password: req.body.password || user.password,
                    })
                    .then((user) => res.status(200).send(user))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {

        if (!req.params.id) {
            return res.status(400).send({
                message: 'The user ID must be a non-empty string.'
            });
        }
        
        return User
            .findById(req.params.id, {
                attributes: ['id', 'username', 'firstName', 'lastName', 'password', 'createdAt', 'updatedAt']
            })
            .then(User => {

                if(!User) {
                    return res.status(400).send({
                        status: 400,
                        message: 'No user with that ID was found.',
                    });
                }

                return User
                    .destroy()
                    .then(() => res.status(200).send({
                        status: 200,
                        message: 'User deleted.'
                    }))
                    .catch(error => res.status(400).send({error}));
            })
            .catch(error => res.status(400).send(error));
    }
};