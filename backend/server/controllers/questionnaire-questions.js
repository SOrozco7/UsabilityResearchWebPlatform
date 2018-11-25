const Question = require('../models').QuestionnaireQuestion; // shorthand

module.exports = {
  create(req, res) {
    if (!req.body.text) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "text" of an instance of "QuestionnaireQuestion" cannot be empty.',
      });
    }
    if (!req.body.questionnaire_id) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "questionnaire_id" of an instance of "QuestionnaireQuestion" cannot be empty.',
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

  bulkCreate(req, res) {
    if (!req.body.questionnairequestions) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "questionnairequestions" of a request to QuestionnaireQuestion.bulkCreate cannot be empty.',
      });
    }
    // eslint-disable-next-line consistent-return
    req.body.questionnairequestions.forEach((questionnairequestion) => {
      if (!questionnairequestion.text) {
        return res.status(400).send({
          status: 400,
          message: 'The attribute "text" of an instance of "QuestionnaireQuestion" cannot be empty.',
        });
      }
      if (!questionnairequestion.questionnaire_id) {
        return res.status(400).send({
          status: 400,
          message: 'The attribute "questionnaire_id" of an instance of "QuestionnaireQuestion" cannot be empty.',
        });
      }
    });

    return Question
      .bulkCreate(req.body.questionnairequestions, { validate: true })
      .then(() => res.status(201).send({
        status: 201,
        message: 'Successfully created questionnaire questions.',
      }))
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
        include: [{ all: true }],
      })
      .then((question) => {
        if (!question) {
          return res.status(404).send({
            status: 400,
            message: 'No question with that ID was found.',
          });
        }
        return res.status(200).send(question);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Question
      .findById(req.params.id, {
      })
      .then((question) => {
        if (!question) {
          return res.status(404).send({
            status: 400,
            message: 'No question with that ID was found.',
          });
        }
        return question
          .update({
            text: req.body.text || question.text,
            questionnaire_id: req.body.questionnaire_id || question.questionnaire_id,
          })
          .then(updatedQuestion => res.status(200).send(updatedQuestion))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Question
      .findById(req.params.id, {
      })
      .then((question) => {
        if (!question) {
          return res.status(404).send({
            status: 400,
            message: 'No question with that ID was found.',
          });
        }
        return question
          .destroy()
          .then(() => res.status(200).send({
            status: 200,
            message: 'QuestionnaireQuestion deleted.',
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
