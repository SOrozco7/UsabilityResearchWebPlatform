'use strict';

var _ = require('lodash');
var shortid = require('shortid');

////////////////////////////////////////////////////////////////////////////////
// PROPERTIES
////////////////////////////////////////////////////////////////////////////////

// Defines an initial set of experiments 
var experiments = [];

////////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function getExperiments(params) {

  var experimentsResult = experiments.slice();

  // Filter by name
  if (params.name !== undefined) {
    experimentsResult = _.filter(experiments, { name: params.name });
  }

  // Order by name
  if (params.sort !== undefined) {
    if (params.sort === 'name') {
      experimentsResult = _.orderBy(experimentsResult, ['name'], ['asc']);
    } else if (params.sort === '-name') {
      experimentsResult = _.orderBy(experimentsResult, ['name'], ['desc']);
    }
  }

  return experimentsResult;
}

function getExperimentById(id) {
  return experiments.find(element => {
    return element.id === id;
  });
}

function getExperimentByName(name) {
  return experiments.find(element => {
    return element.name === name;
  });
}

function createExperiment(experiment) {

  var newExperiment = {
    id: shortid.generate(),
    name: experiment.name,
    description: experiment.description,
    image: experiment.image
  };

  experiments.push(newExperiment);

  return getExperimentById(newExperiment.id);
}

function updateExperiment(experiment) {

  var idToSearch = experiment.id;

  var experimentToUpdate = getExperimentById(idToSearch);

  if (experimentToUpdate !== undefined) {
    experimentToUpdate.name = experiment.name;
    experimentToUpdate.description = experiment.description;
    experimentToUpdate.image = experiment.image;
  }

  return experimentToUpdate;
}

function deleteExperiment(id) {

  var idToSearch = id;

  var experimentToDelete = getExperimentById(idToSearch);

  if (experimentToDelete !== undefined) {
    _.remove(experiments, function (element) {
      return element.id === experimentToDelete.id;
    });
    return true;
  } else {
    return false;
  }
}

function initDefaultExperiments(experimentsSet) {
  experiments = experimentsSet.slice();
}

module.exports = {
  getExperiments,
  getExperimentById,
  getExperimentByName,
  createExperiment,
  updateExperiment,
  deleteExperiment,
  initDefaultExperiments
}