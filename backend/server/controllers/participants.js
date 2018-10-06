const Participant = require('../models').Participant;
const Experiment = require('../models').Experiment;

module.exports = {
    create(req, res) {
        if (!req.body.experiment_id) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "experiment_id" of an instance "Participant" cannot be empty.'
          });
        }
        return Participant
            .create({
                id: req.body.id,
                experiment_id: req.body.experiment_id
            })
            .then(participant => res.status(201).send(participant))
            .catch(error => res.status(400).send(error));
        
    },

    list(req, res) {
        return Participant
            .findAll({
                include: [
                    {
                        model: Experiment,
                        as: 'experiment',
                        required: false,
                    }
                ]
            })
            .then(participants => res.status(200).send(participants))
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {
        return Participant
            .findById(req.params.id, {
                include: [
                    {
                        model: Experiment,
                        as: 'experiment',
                        required: false,
                    }
                ]
            })
            .then(participant => {
                if (!participant) {
                    return res.status(404).send({
                        status: 400,
                        message: 'No participant with that ID was found.',
                    });
                }
                res.status(200).send(participant);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Participant
            .findById(req.params.id, {
                attributes: ['id', 'experiment_id']
            })
            .then(participant => {
                if (!participant) {
                    return res.status(404).send({
                        status: 400,
                        message: 'No participant with that ID was found.',
                    });
                }
                return participant
                    .update({
                        experiment_id: req.body.experiment_id || participant.experiment_id,
                    })
                    .then((user) => res.status(200).send(user))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
        if (!req.params.id) {
            return res.status(400).send({
                status: 400,
                message: 'The participant ID must be a non-empty integer.'
            });
        }

        return Participant
            .findById(req.params.id, {
                attributes: ['id', 'experiment_id']
            })
            .then(participant => {
                if (!participant) {
                    return res.status(400).send({
                        status: 400,
                        message: 'No participant with that ID was found.',
                    });
                }

                return participant
                    .destroy()
                    .then(() => res.status(200).send({
                        status: 200,
                        message: 'User deleted.'
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }

};