'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
var userService = require('../services/user.service');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[User Controller]';

// Error Messages
const USR_CT_ERR_USER_NOT_FOUND = 'User not found';

// Success Messages
const USR_CT_DELETED_SUCCESSFULLY = 'User deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

// This login function will be the same as getUserById for now
function login(req, res) {

    try {
        // Receiving parameters
        var params = {
            id: req.swagger.params.id.value
        };

        // Call to service
        var result = userService.getUserById(params.id);

        // Returning the result
        if (!_.isUndefined(result)) {
            res.json(result);
        } else {
            res.status(404).json(messageHelper.buildMessage(USR_CT_ERR_USER_NOT_FOUND))
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, getUserById.name, error, res);
    }
}

function getUsers(req, res) {

    try {
        // Receiving parameters
        var params = {
            name: req.swagger.params.name.value,
            sort: req.swagger.params.sort.value
        };

        // Call to service
        var result = userService.getUsers(params);

        // Returning the result
        res.json(result);
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, getUsers.name, error, res);
    }
}

function getUserById(req, res) {

    try {
        // Receiving parameters
        var params = {
            id: req.swagger.params.id.value
        };

        // Call to service
        var result = userService.getUserById(params.id);

        // Returning the result
        if (!_.isUndefined(result)) {
            res.json(result);
        } else {
            res.status(404).json(messageHelper.buildMessage(USR_CT_ERR_USER_NOT_FOUND))
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, getUserById.name, error, res);
    }
}

function createUser(req, res) {

    try {
        // Receiving parameters
        var params = req.body;

        // Call to service
        var result = userService.createUser(params);

        // Returning the result
        if (!_.isUndefined(result) && _.isUndefined(result.error)) {
            res.status(201).json(result);
        } else {
            res.status(409).json(messageHelper.buildMessage(result.error));
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, createUser.name, error, res);
    }
}

function updateUser(req, res) {

    try {
        // Receiving parameters
        var params = {
            id: req.swagger.params.id.value
        };
        _.assign(params, req.body);

        // Call to service
        var result = userService.updateUser(params);

        // Returning the result
        if (!_.isUndefined(result) && _.isUndefined(result.error)) {
            res.json(result);
        } else {
            res.status(409).json(messageHelper.buildMessage(result.error));
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, updateUser.name, error, res);
    }
}

function deleteUser(req, res) {

    try {
        // Receiving parameters
        var params = {
            id: req.swagger.params.id.value
        };

        // Call to service
        var result = userService.deleteUser(params.id);

        // Returning the result
        if (!_.isUndefined(result) && _.isUndefined(result.error)) {
            res.json(messageHelper.buildMessage(USR_CT_DELETED_SUCCESSFULLY));
        } else {
            res.status(404).json(messageHelper.buildMessage(result.error));
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, deleteUser.name, error, res);
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    USR_CT_ERR_USER_NOT_FOUND,
    USR_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
}