const BodyParts = require('../models').BodyPart;
const Experiment = require('../models').Experiment;

module.exports = {
    create(req, res) {
        // check that params are not null, undefined or empty string
        console.log("mi nacho");
        for(const i in  req.body.bodyPart[i])
        {
            console.log("super nacho");
            if (req.body.bodyPart[i]) {
                BodyParts
                .create({
                    BodyPart: req.body.bodyPart[i],
                    experiment_id: req.body.experiment_id
                })
                .then(BodyPart => res.status(201).send(BodyPart))
                .catch(error => res.status(400).send(error));
            }
        }
        

        return;
         
    },

    list(req, res) {
        
    },

    retrieve(req, res) {
        
    },

    update(req, res) {
       
    },

    destroy(req, res) {
        // check that project id is not null, undefined, not an integer or 0
    },
};