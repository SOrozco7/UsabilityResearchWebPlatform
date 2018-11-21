const { QuestionResponse } = require('../models');

module.exports = {
  create(req, res) {
    if (!req.body.videoId) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "videoId" of an instance "QuestionResponse" cannot be empty.',
      });
    }
    if (!req.body.question_id) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "question_id" of an instance "QuestionResponse" cannot be empty.',
      });
    }
    if (!req.body.participant_id) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "participant_id" of an instance "QuestionResponse" cannot be empty.',
      });
    }
    return QuestionResponse
      .create({
        videoId: req.body.videoId,
        question_id: req.body.question_id,
        participant_id: req.body.participant_id,
      })
      .then(response => res.status(201).send(response))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return QuestionResponse
      .findAll({
        include: [{ all: true }],
      })
      .then(responses => res.status(200).send(responses))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return QuestionResponse
      .findById(req.params.id, {
        include: [{ all: true }],
      })
      .then((response) => {
        if (!response) {
          return res.status(404).send({
            status: 400,
            message: 'No question response with that ID was found.',
          });
        }
        return res.status(200).send(response);
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return QuestionResponse
      .findById(req.params.id, {
      })
      .then((response) => {
        if (!response) {
          return res.status(404).send({
            status: 400,
            message: 'No question response with that ID was found.',
          });
        }
        return response
          .destroy()
          .then(() => res.status(200).send({
            status: 200,
            message: 'QuestionResponse deleted.',
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
