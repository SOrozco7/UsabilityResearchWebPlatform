'use strict';

var _ = require('lodash');

var experimentRepository = require('../repositories/experiment.repository');
var messageHelper = require('../helpers/message.helper');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Error Messages
const EXP_SVC_ERR_CREATE_EXP_ALREADY_EXISTS_WITH_SAME_NAME = 'Creating an experiment was not possible. There is an experiment with the same name in the system.';
const EXP_SVC_ERR_UPDATE_EXP_ALREADY_EXISTS_WITH_SAME_NAME = 'Updating the experiment was not possible. There already exists an experiment with the same name in the system.';
const EXP_SVC_ERR_UPDATE_EXP_NOT_FOUND_BY_ID = 'Updating the experiment was not possible. There is no experiment associated with that id.'
const EXP_SVC_ERR_DELETE_EXP_NOT_FOUND_BY_ID = 'Deleting the experiment was not possible. Experiment not found.';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function getExperiments(params) {
    return experimentRepository.getExperiments(params);
}

function getExperimentById(id) {
    return experimentRepository.getExperimentById(id);
}

function getExperimentByName(name) {
    return experimentRepository.getExperimentByName(name);
}

function createExperiment(params) {

    // Checks if there exists an experiment with the same name
    // Using module.exports to call the function to ease the testing
    var experimentFound = module.exports.getExperimentByName(params.name);
    if (_.isUndefined(experimentFound)) {
        return experimentRepository.createExperiment(params);
    } else {
        return messageHelper.buildErrorMessage(EXP_SVC_ERR_CREATE_EXP_ALREADY_EXISTS_WITH_SAME_NAME);
    }
}

function updateExperiment(params) {

    var result;
    // Checks if there exists an experiment with the same id
    // Using module.exports to call the function to ease the testing
    var experimentFoundById = module.exports.getExperimentById(params.id);
    if (!_.isUndefined(experimentFoundById)) {

        // Then checks if there exists a experiment with the same name. If there exists one, 
        // then the id must be the same as the object in the params
        var experimentFoundByName = module.exports.getExperimentByName(params.name);

        if (_.isUndefined(experimentFoundByName) || experimentFoundByName.id === params.id) {
            result = experimentRepository.updateExperiment(params);
        } else {
            result = messageHelper.buildErrorMessage(EXP_SVC_ERR_UPDATE_EXP_ALREADY_EXISTS_WITH_SAME_NAME);
        }
    } else {
        result = messageHelper.buildErrorMessage(EXP_SVC_ERR_UPDATE_EXP_NOT_FOUND_BY_ID);
    }

    return result;
}

function deleteExperiment(id) {

    var result;

    // First, obtain the experiment
    var myExperiment = module.exports.getExperimentById(id);

    if (!_.isUndefined(myExperiment)) {
        var filterParams = {
            experiment: myExperiment.name
        };

        var deletionResult = experimentRepository.deleteExperiment(id);
        if (deletionResult) {
            result = true;
        } else {
            result = messageHelper.buildErrorMessage(EXP_SVC_ERR_DELETE_EXP_NOT_FOUND_BY_ID);
        }

    } else {
        result = messageHelper.buildErrorMessage(EXP_SVC_ERR_DELETE_EXP_NOT_FOUND_BY_ID);
    }

    return result;
}

module.exports = {
    getExperiments,
    getExperimentById,
    getExperimentByName,
    createExperiment,
    updateExperiment,
    deleteExperiment,
    EXP_SVC_ERR_CREATE_EXP_ALREADY_EXISTS_WITH_SAME_NAME,
    EXP_SVC_ERR_UPDATE_EXP_ALREADY_EXISTS_WITH_SAME_NAME,
    EXP_SVC_ERR_UPDATE_EXP_NOT_FOUND_BY_ID,
    EXP_SVC_ERR_DELETE_EXP_NOT_FOUND_BY_ID
}