const Question = require('../models').QuestionnaireQuestion; // shorthand

module.exports = {
    create(req, res) {
        if (!req.body.text) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "text" of an instance of "QuestionnaireQuestion" cannot be empty.'
            });
        }
        if (!req.body.questionnaire_id) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "questionnaire_id" of an instance of "QuestionnaireQuestion" cannot be empty.'
            });
        }
        return Question
            .create({
                text: req.body.text,
                questionnaire_id: req.body.questionnaire_id,
            })
            .then(question => res.status(201).send(question))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Question
            .findAll({
            })
            .then(questions => res.status(200).send(questions))
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {
        return Question
            .findById(req.params.id, {
            })
            .then(question => {
                if (!question) {
                    return res.status(404).send({
                        status: 400,
                        message: 'No question with that ID was found.'
                    });
                }
                res.status(200).send(question);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Question
            .findById(req.params.id, {
            })
            .then(question => {
                if (!question) {
                    return res.status(404).send({
                        status: 400,
                        message: 'No question with that ID was found.'
                    });
                }
                return question
                    .update({
                        text: req.body.text || question.text,
                        questionnaire_id: req.body.questionnaire_id || question.questionnaire_id,
                    })
                    .then(question => res.status(200).send(question))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    destroy(req, res) {
        return Question
            .findById(req.params.id, {
            })
            .then(question => {
                if (!question) {
                    return res.status(404).send({
                        status: 400,
                        message: 'No question with that ID was found.'
                    });
                }
                return question 
                    .destroy()
                    .then(() => res.status(200).send({
                        status: 200,
                        message: 'QuestionnaireQuestion deleted.'
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};