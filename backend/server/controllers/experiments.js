const Experiment = require('../models').Experiment;
const User = require('../models').User;

module.exports = {
    create(req, res) {
        // check that params are not null, undefined or empty string
        if (!req.body.name) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "name" of an instance of "Experiment" cannot be empty.'
            });
        }
        if (!req.body.description) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "description" of an instance of "Experiment" cannot be empty.'
            });
        }
        if (!req.body.startDate) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "startDate" of an instance of "Experiment" cannot be empty.'
            });
        }
        if (!req.body.endDate) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "endDate" of an instance of "Experiment" cannot be empty.'
            });
        }

        var begin = new Date(req.body.startDate);
        var end = new Date(req.body.endDate);

        if (begin > end) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "endDate" of an instance of "Experiment" cannot be before its attribute "startDate".'
            });
        }
       
        if (!req.body.user_id) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "user_id" of an instance of "Experiment" cannot be empty.'
            });
        }

        return Experiment
            .create({
                name: req.body.name,
                description: req.body.description,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                user_id: req.body.user_id
            })
            .then(Experiment => res.status(201).send(Experiment))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Experiment
            .findAll({
                // include: [
                //     {
                //         model: User,
                //         as: 'user_id',
                //         required: false,
                //         attributes: ['id', 'firstName', 'lastName', 'username', 'createdAt', 'updatedAt']
                //     }
                // ],
                // attributes: ['id', 'name', 'description', 'startDate', 'endDate', 'createdAt', 'updatedAt', 'user_id']
            })
            .then(experiments => res.status(200).send(experiments))
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {
        // check that experiment id is not null, undefined. Check that the id is not zero.
        if (!req.body.id && req.body.id === parseInt(req.body.id, 10)) {
            return res.status(400).send({
                message: 'The experiment ID must be an integer bigger than 0'
            });
        }

        return Experiment
            .findById(req.params.id, {
                // include: [
                //     {
                //         model: User,
                //         as: 'user_id',
                //         required: false,
                //         attributes: ['id', 'firstName', 'lastName', 'username', 'createdAt', 'updatedAt']
                //     }
                // ],
                //Without these attributes, it fails bacuse its trying to search for an experiment_id that doesn't exists
                attributes: ['id', 'name', 'description', 'startDate', 'endDate', 'createdAt', 'updatedAt', 'user_id']
            })
            .then(experiment => {
                if (!experiment) {
                    return res.status(400).send({
                        message: 'No experiment with that ID was found.'
                    });
                }
                return res.status(200).send(experiment);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Experiment
            .findById(req.params.id, {
                attributes: ['id', 'name', 'description', 'startDate', 'endDate', 'createdAt', 'updatedAt', 'user_id']
            })
            .then(experiment => {
                if (!experiment) {
                    return res.status(400).send({
                        status: 400,
                        message: 'Experiment Not Found'
                    });
                } else {
                    //If im trying to update a date, the date must be correct
                    const begin = new Date(req.body.startDate || experiment.startDate);
                    const end = new Date(req.body.endDate || experiment.endDate);
                    if (begin > end) {
                        return res.status(400).send({
                            message: 'The end date cannot be before the begin date.'
                        });
                    }
                }
                return experiment
                    .update({
                        name: req.body.name || experiment.name,
                        description: req.body.description || experiment.description,
                        startDate: req.body.startDate || experiment.startDate,
                        endDate: req.body.endDate || experiment.endDate
                    })
                    .then((experiment) => res.status(200).send(experiment)) // Send back the updated tuple.
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
        // check that project id is not null, undefined, not an integer or 0
        if (!req.params.id && req.params.id === parseInt(req.params.id, 10)) {
            return res.status(400).send({
                message: 'ID must be an integer bigger than 0'
            });
        }
        return Experiment
            .findById(req.params.id, {
                attributes: ['id', 'name', 'description', 'startDate', 'endDate', 'createdAt', 'updatedAt', 'user_id']
            })
            .then(Experiment => {
                if (!Experiment) {
                    return res.status(400).send({
                        status: 400,
                        message: 'Experiment Not Found',
                    });
                }
                return Experiment
                    .destroy()
                    .then(() => res.status(200).send({
                        status: 200,
                        message: 'Experiment deleted'
                    }))
                    .catch(error => res.status(400).send({error}));
            })
            .catch(error => res.status(400).send(error));
    },
};