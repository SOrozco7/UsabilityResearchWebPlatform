const Question = require('../models').Question;
const User = require('../models').User;

module.exports = {
    create(req, res) {
        // check that params are not null, undefined or empty string
        if (!req.body.text) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "name" of an instance of "Experiment" cannot be empty.'
            });
        }
        if (!req.body.initialimage) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "description" of an instance of "Experiment" cannot be empty.'
            });
        }
        if (!req.body.finalimage) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "startDate" of an instance of "Experiment" cannot be empty.'
            });
        }
        if (!req.body.initialsound) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "startDate" of an instance of "Experiment" cannot be empty.'
            });
        }
        if (!req.body.finalsound) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "endDate" of an instance of "Experiment" cannot be empty.'
            });
        }

        return Question
            .create({
                text: req.body.text,
                initialimage: req.body.initialimage,
                finalimage: req.body.finalimage,
                initialsound: req.body.initialsound,
                finalsound: req.body.finalsound,
                user_id: req.body.user_id
            })
            .then(Question => res.status(201).send(Question))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Question
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
            .then(questions => res.status(200).send(questions))
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {
        // check that experiment id is not null, undefined. Check that the id is not zero.
        if (!req.body.id && req.body.id === parseInt(req.body.id, 10)) {
            return res.status(400).send({
                message: 'The question ID must be an integer bigger than 0'
            });
        }

        return Question
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
                attributes: ['id', 'text', 'initialimage', 'finalimage', 'initialsound', 'finalsound', 'createdAt', 'updatedAt', 'user_id']
            })
            .then(question => {
                if (!question) {
                    return res.status(400).send({
                        status: 400,
                        message: 'No experiment with that ID was found.'
                    });
                }
                return res.status(200).send(question);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Question
            .findById(req.params.id, {
                attributes: ['id', 'text', 'initialimage', 'finalimage', 'initialsound', 'finalsound', 'createdAt', 'updatedAt', 'user_id']
            })
            .then(question => {
                if (!question) {
                    return res.status(400).send({
                        status: 400,
                        message: 'No question with that ID was found.'
                    });
                }
                return question
                    .update({
                        text: req.body.name || question.text,
                        initialimage: req.body.initialimage || question.initialimage,
                        finalimage: req.body.finalimage || question.finalimage,
                        initialsound: req.body.initialsound || question.initialsound,
                        finalsound: req.body.finalsound || question.finalsound
                    })
                    .then((question) => res.status(200).send(question)) // Send back the updated tuple.
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
        return Question
            .findById(req.params.id, {
                attributes: ['id', 'text', 'initialimage', 'finalimage', 'initialsound', 'finalsound', 'createdAt', 'updatedAt', 'user_id']
            })
            .then(Question => {
                if (!Question) {
                    return res.status(400).send({
                        status: 400,
                        message: 'No question with that ID was found.',
                    });
                }
                return Question
                    .destroy()
                    .then(() => res.status(200).send({
                        status: 200,
                        message: 'Question deleted'
                    }))
                    .catch(error => res.status(400).send({error}));
            })
            .catch(error => res.status(400).send(error));
    },
};