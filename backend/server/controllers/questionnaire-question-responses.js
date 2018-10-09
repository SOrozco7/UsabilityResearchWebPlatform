const QuestionResponse = require('../models').QuestionnaireQuestionResponse; // shorthand

module.exports = {
    create(req, res) {
        if (!req.body.responseValue) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "responseValue" of an instance of "QuestionnaireQuestionResponse" cannot be empty.'
            });
        }

        if (!req.body.QuestionnaireQuestionId) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "QuestionnaireQuestionId" of an instance of "QuestionnaireQuestionResponse" cannot be empty.'
            });
        }

        if (!req.body.QuestionnaireResponseId) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "QuestionnaireResponseId" of an instance of "QuestionnaireQuestionResponse" cannot be empty.'
            });
        }

        return QuestionResponse
            .create({
                responseValue: req.body.responseValue,
                QuestionnaireQuestionId: req.body.QuestionnaireQuestionId,
                QuestionnaireResponseId: req.body.QuestionnaireResponseId
            })
            .then(question => res.status(201).send(question))
            .catch(error => res.status(400).send(error));
    }

};