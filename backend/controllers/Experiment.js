'use strict';

var utils = require('../utils/writer.js');
var Experiment = require('../service/ExperimentService');

module.exports.createExperiment = function createExperiment (req, res, next) {
  var body = req.swagger.params['body'].value;
  Experiment.createExperiment(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteExperiment = function deleteExperiment (req, res, next) {
  var experimentId = req.swagger.params['experimentId'].value;
  Experiment.deleteExperiment(experimentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getExperiments = function getExperiments (req, res, next) {
  var experimentId = req.swagger.params['experimentId'].value;
  Experiment.getExperiments(experimentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listExperiments = function listExperiments (req, res, next) {
  var body = req.swagger.params['body'].value;
  Experiment.listExperiments(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateExperiment = function updateExperiment (req, res, next) {
  var experimentId = req.swagger.params['experimentId'].value;
  Experiment.updateExperiment(experimentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
