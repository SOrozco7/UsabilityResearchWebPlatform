const BodyPart = require('../models').BodyParts;

// Need to create the basics for each part of bodyParts
module.exports = {
  create(req, res) {
    // check that params are not null, undefined or empty string

    req.body.bodyPart.forEach((bodyPart) => {
      if (bodyPart) {
        BodyPart
          .create({
            BodyPart: bodyPart,
            experiment_id: req.body.experiment_id,
          })
          .then(response => res.status(201).send(response))
          .catch(error => res.status(400).send(error));
      }
    });
  },

  list() {

  },

  retrieve() {

  },

  update() {

  },

  destroy() {
    // check that project id is not null, undefined, not an integer or 0
  },
};
