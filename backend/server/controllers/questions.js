const { Question } = require('../models');

module.exports = {
  create(req, res) {
    // check that params are not null, undefined or empty string
    if (!req.body.text) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "text" of an instance of "Question" cannot be empty.',
      });
    }
    if (!req.body.initialImage) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "initialImage" of an instance of "Question" cannot be empty.',
      });
    }
    if (!req.body.finalImage) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "finalImage" of an instance of "Question" cannot be empty.',
      });
    }
    // if (!req.body.initialSound) {
    //   return res.status(400).send({
    //     status: 400,
    //     message: 'The attribute "inititalSound" of an instance of "Question" cannot be empty.',
    //   });
    // }
    // if (!req.body.finalSound) {
    //   return res.status(400).send({
    //     status: 400,
    //     message: 'The attribute "finalSound" of an instance of "Question" cannot be empty.',
    //   });
    // }

    return Question
      .create({
        text: req.body.text,
        initialImage: req.body.initialImage,
        finalImage: req.body.finalImage,
        initialSound: req.body.initialSound,
        finalSound: req.body.finalSound,
        experiment_id: req.body.experiment_id,
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
    // check that question id is not null, undefined. Check that the id is not zero.
    if (!req.body.id && req.body.id === parseInt(req.body.id, 10)) {
      return res.status(400).send({
        message: 'The question ID must be an integer bigger than 0',
      });
    }

    return Question
      .findById(req.params.id, {
        attributes: ['id', 'text', 'initialImage', 'finalImage', 'initialSound', 'finalSound', 'createdAt', 'updatedAt', 'experiment_id'],
      })
      .then((question) => {
        if (!question) {
          return res.status(400).send({
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
        attributes: ['id', 'text', 'initialImage', 'finalImage', 'initialSound', 'finalSound', 'createdAt', 'updatedAt', 'experiment_id'],
      })
      .then((question) => {
        if (!question) {
          return res.status(400).send({
            status: 400,
            message: 'No question with that ID was found.',
          });
        }
        return question
          .update({
            text: req.body.text || question.text,
            initialImage: req.body.initialImage || question.initialImage,
            finalImage: req.body.finalImage || question.finalImage,
            initialSound: req.body.initialSound || question.initialSound,
            finalSound: req.body.finalSound || question.finalSound,
          })
          .then(updatedQuestion => res.status(200).send(updatedQuestion))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    // check that project id is not null, undefined, not an integer or 0
    if (!req.params.id && req.params.id === parseInt(req.params.id, 10)) {
      return res.status(400).send({
        message: 'ID must be an integer bigger than 0',
      });
    }
    return Question
      .findById(req.params.id, {
        attributes: ['id', 'text', 'initialImage', 'finalImage', 'initialSound', 'finalSound', 'createdAt', 'updatedAt', 'experiment_id'],
      })
      .then((question) => {
        if (!question) {
          return res.status(400).send({
            status: 400,
            message: 'No question with that ID was found.',
          });
        }
        return question
          .destroy()
          .then(() => res.status(200).send({
            status: 200,
            message: 'Question deleted',
          }))
          .catch(error => res.status(400).send({ error }));
      })
      .catch(error => res.status(400).send(error));
  },
};
