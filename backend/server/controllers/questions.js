const Question = require('../models').Question;
const User = require('../models').User;

module.exports = {
    create(req, res) {
        // check that params are not null, undefined or empty string
        if (!req.body.text) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "text" of an instance of "Question" cannot be empty.'
            });
        }
        if (!req.body.initialImage) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "initialImage" of an instance of "Question" cannot be empty.'
            });
        }
        if (!req.body.finalImage) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "finalImage" of an instance of "Question" cannot be empty.'
            });
        }
        if (!req.body.initialSound) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "inititalSound" of an instance of "Question" cannot be empty.'
            });
        }
        if (!req.body.finalSound) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "finalSound" of an instance of "Question" cannot be empty.'
            });
        }

        return Question
            .create({
                text: req.body.text,
                initialImage: req.body.initialImage,
                finalImage: req.body.finalImage,
                initialSound: req.body.initialSound,
                finalSound: req.body.finalSound,
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
        // check that question id is not null, undefined. Check that the id is not zero.
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
                attributes: ['id', 'text', 'initialImage', 'finalImage', 'initialSound', 'finalSound', 'createdAt', 'updatedAt', 'user_id']
            })
            .then(question => {
                if (!question) {
                    return res.status(400).send({
                        status: 400,
                        message: 'No question with that ID was found.'
                    });
                }
                return res.status(200).send(question);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Question
            .findById(req.params.id, {
                attributes: ['id', 'text', 'initialImage', 'finalImage', 'initialSound', 'finalSound', 'createdAt', 'updatedAt', 'user_id']
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
                        initialImage: req.body.initialImage || question.initialImage,
                        finalImage: req.body.finalImage || question.finalImage,
                        initialSound: req.body.initialSound || question.initialSound,
                        finalSound: req.body.finalSound || question.finalSound
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
                attributes: ['id', 'text', 'initialImage', 'finalImage', 'initialSound', 'finalSound', 'createdAt', 'updatedAt', 'user_id']
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