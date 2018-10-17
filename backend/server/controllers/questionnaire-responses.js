const Response = require('../models').QuestionnaireResponse; // shorthand

module.exports = {
  create(req, res) {
    if (!req.body.participant_id) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "participant_id" of an instance "QuestionnaireResponse" cannot be empty.',
      });
    }
    if (!req.body.questionnaire_id) {
      return res.status(400).send({
        status: 400,
        message: 'The attribute "participant_id" of an instance "QuestionnaireResponse" cannot be empty.',
      });
    }
    return Response
      .create({
        participant_id: req.body.participant_id,
        questionnaire_id: req.body.questionnaire_id,
      })
      .then(response => res.status(201).send(response))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Response
      .findAll()
      .then(responses => res.status(200).send(responses))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Response
      .findById(req.params.id, {
      })
      .then((response) => {
        if (!response) {
          return res.status(404).send({
            status: 400,
            message: 'No questionnaire response with that ID was found.',
          });
        }
        return res.status(200).send(response);
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Response
      .findById(req.params.id, {
      })
      .then((response) => {
        if (!response) {
          return res.status(404).send({
            status: 400,
            message: 'No questionnaire response with that ID was found.',
          });
        }
        return response
          .destroy()
          .then(() => res.status(200).send({
            status: 200,
            message: 'QuestionnaireResponse deleted.',
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
