const Experiment = require('../models').Experiment;
const User = require('../models').User;

module.exports = {
    create(req, res) {
        // check that params are not null, undefined or empty string
        if (!req.body.name) {
            return res.status(400).send({
                message: 'Attribute name cannot be empty'
            });
        }
        if (!req.body.description) {
            return res.status(400).send({
                message: 'Attribute description cannot be empty'
            });
        }
        if (!req.body.startDateTime) {
            return res.status(400).send({
                message: 'Attribute begin date cannot be empty'
            });
        }
        if (!req.body.endDateTime) {
            return res.status(400).send({
                message: 'Attribute end date cannot be empty'
            });
        }

        var begin = new Date(req.body.startDateTime);
        var end = new Date(req.body.endDateTime);

        if (begin > end) {
            return res.status(400).send({
                message: 'End date cannot be before begin date'
            });
        }
       
        if (!req.body.user_id) {
            return res.status(400).send({
                message: 'Attribute user_id cannot be empty'
            });
        }

        return Experiment
            .create({
                name: req.body.name,
                description: req.body.description,
                startDateTime: req.body.startDateTime,
                endDateTime: req.body.endDateTime,
                user_id: req.body.user_id
            })
            .then(Experiment => res.status(200).send(Experiment))
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
                // attributes: ['id', 'name', 'description', 'startDateTime', 'endDateTime', 'createdAt', 'updatedAt', 'user_id']
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
                attributes: ['id', 'name', 'description', 'startDateTime', 'endDateTime', 'createdAt', 'updatedAt', 'user_id']
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
                attributes: ['id', 'name', 'description', 'startDateTime', 'endDateTime', 'createdAt', 'updatedAt', 'user_id']
            })
            .then(experiment => {
                if (!experiment) {
                    return res.status(400).send({
                        message: 'No experiment with that ID was found.'
                    });
                } else {
                    //If im trying to update a date, the date must be correct
                    const begin = new Date(req.body.startDateTime || experiment.startDateTime);
                    const end = new Date(req.body.endDateTime || experiment.endDateTime);
                    if (begin > end) {
                        return res.status(400).send({
                            message: 'The end date cannot be before the begin date.'
                        });
                    }
                }
                return Experiment
                    .update({
                        name: req.body.name || Experiment.name,
                        description: req.body.description || Experiment.description,
                        startDateTime: req.body.startDateTime || Experiment.startDateTime,
                        endDateTime: req.body.endDateTime || Experiment.endDateTime
                        // user_id: req.body.user_id || Experiment.user_id
                    })
                    .then(() => res.status(200).send(Experiment)) // Send back the updated tuple.
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
                attributes: ['id', 'name', 'description', 'startDateTime', 'endDateTime', 'createdAt', 'updatedAt', 'user_id']
            })
            .then(Experiment => {
                if (!Experiment) {
                    return res.status(400).send({
                        message: 'Not Found',
                    });
                }
                return Experiment
                    .destroy()
                    .then(() => res.status(200).send({
                        message: 'Experiment deleted'
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};