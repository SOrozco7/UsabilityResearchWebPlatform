'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
var experimentService = require('../services/experiment.service');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[Experiment Controller]';

// Error Messages
const EXP_CT_ERR_EXPERIMENT_NOT_FOUND = 'Experiment not found';

// Success Messages
const EXP_CT_DELETED_SUCCESSFULLY = 'Experiment deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function getExperiments(req, res) {

    try {
        // Receiving parameters
        var params = {
            name: req.swagger.params.name.value,
            sort: req.swagger.params.sort.value
        };

        // Call to service
        var result = experimentService.getExperiments(params);

        // Returning the result
        res.json(result);
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, getExperiments.name, error, res);
    }
}

function getExperimentById(req, res) {

    try {
        // Receiving parameters
        var params = {
            id: req.swagger.params.id.value
        };

        // Call to service
        var result = experimentService.getExperimentById(params.id);

        // Returning the result
        if (!_.isUndefined(result)) {
            res.json(result);
        } else {
            res.status(404).json(messageHelper.buildMessage(EXP_CT_ERR_EXPERIMENT_NOT_FOUND))
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, getExperimentById.name, error, res);
    }
}

function createExperiment(req, res) {

    try {
        // Receiving parameters
        var params = req.body;

        // Call to service
        var result = experimentService.createExperiment(params);

        // Returning the result
        if (!_.isUndefined(result) && _.isUndefined(result.error)) {
            res.status(201).json(result);
        } else {
            res.status(409).json(messageHelper.buildMessage(result.error));
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, createExperiment.name, error, res);
    }
}

function updateExperiment(req, res) {

    try {
        // Receiving parameters
        var params = {
            id: req.swagger.params.id.value
        };
        _.assign(params, req.body);

        // Call to service
        var result = experimentService.updateExperiment(params);

        // Returning the result
        if (!_.isUndefined(result) && _.isUndefined(result.error)) {
            res.json(result);
        } else {
            res.status(409).json(messageHelper.buildMessage(result.error));
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, updateExperiment.name, error, res);
    }
}

function deleteExperiment(req, res) {

    try {
        // Receiving parameters
        var params = {
            id: req.swagger.params.id.value
        };

        // Call to service
        var result = experimentService.deleteExperiment(params.id);

        // Returning the result
        if (!_.isUndefined(result) && _.isUndefined(result.error)) {
            res.json(messageHelper.buildMessage(EXP_CT_DELETED_SUCCESSFULLY));
        } else {
            res.status(404).json(messageHelper.buildMessage(result.error));
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, deleteExperiment.name, error, res);
    }
}

module.exports = {
    getExperiments,
    getExperimentById,
    createExperiment,
    updateExperiment,
    deleteExperiment,
    EXP_CT_ERR_EXPERIMENT_NOT_FOUND,
    EXP_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
}