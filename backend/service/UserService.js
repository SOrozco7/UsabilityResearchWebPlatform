'use strict';


/**
 * Create an experiment
 * This method creates an experiment with the given parameters.
 *
 * body Experiment Experiment object of the experiment that needs to be created.
 * returns List
 **/
exports.createExperiment = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "startDateTime" : "2000-01-23T04:56:07.000+00:00",
  "name" : "name",
  "id" : 0,
  "endDateTime" : "2000-01-23T04:56:07.000+00:00"
}, {
  "startDateTime" : "2000-01-23T04:56:07.000+00:00",
  "name" : "name",
  "id" : 0,
  "endDateTime" : "2000-01-23T04:56:07.000+00:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete experiment
 * This method deletes the experiment.
 *
 * experimentId Integer 
 * no response value expected for this operation
 **/
exports.deleteExperiment = function(experimentId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Request authentication
 * This method logs the user in.
 *
 * experimentId Integer 
 * no response value expected for this operation
 **/
exports.getExperiments = function(experimentId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * List the current user's experiments
 * This method retrieves the whole list of experiments created by the user that is logged in.
 *
 * body Experiment User object whose experiments are to be listed.
 * no response value expected for this operation
 **/
exports.listExperiments = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Request authentication
 * This method logs the user in.
 *
 * body User User object that needs to be logged in.
 * no response value expected for this operation
 **/
exports.login = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update experiment
 * This method updates an experiment given the user id.
 *
 * experimentId Long ID of experiment to update
 * no response value expected for this operation
 **/
exports.updateExperiment = function(experimentId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

