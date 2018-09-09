'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.createExperiment = function createExperiment (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.createExperiment(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteExperiment = function deleteExperiment (req, res, next) {
  var experimentId = req.swagger.params['experimentId'].value;
  User.deleteExperiment(experimentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getExperiments = function getExperiments (req, res, next) {
  var experimentId = req.swagger.params['experimentId'].value;
  User.getExperiments(experimentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listExperiments = function listExperiments (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.listExperiments(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.login = function login (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.login(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateExperiment = function updateExperiment (req, res, next) {
  var experimentId = req.swagger.params['experimentId'].value;
  User.updateExperiment(experimentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
