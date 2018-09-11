'use strict';

var _ = require('lodash');

var experimentRepository = require('../repositories/experiment.repository');
var userRepository = require('../repositories/user.repository');
var messageHelper = require('../helpers/message.helper');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Error Messages
const USR_SVC_ERR_CREATE_USR_ALREADY_EXISTS_WITH_SAME_NAME = 'Creating a user was not possible. There is a user with the same name in the system.';
const USR_SVC_ERR_UPDATE_USR_ALREADY_EXISTS_WITH_SAME_NAME = 'Updating the user was not possible. There already exists a user with the same name in the system.';
const USR_SVC_ERR_UPDATE_USR_NOT_FOUND_BY_ID = 'Updating the user was not possible. There is no user associated with that id.'
const USR_SVC_ERR_DELETE_USR_NOT_FOUND_BY_ID = 'Deleting the user was not possible. User not found.';
const USR_SVC_ERR_DELETE_ASSOCIATED_EXP_EXISTS = 'Deleting the user was not possible. There is at least one experiment associated with the user.';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function getUsers(params) {
    return userRepository.getUsers(params);
}

function getUserById(id) {
    return userRepository.getUserById(id);
}

function getUserByName(name) {
    return userRepository.getUserByName(name);
}

function createUser(params) {

    // Checks if there exists a user with the same name 
    // Using module.exports to call the function to ease the testing
    var userFound = module.exports.getUserByName(params.name);
    if (_.isUndefined(userFound)) {
        return userRepository.createUser(params);
    } else {
        return messageHelper.buildErrorMessage(USR_SVC_ERR_CREATE_USR_ALREADY_EXISTS_WITH_SAME_NAME);
    }
}

function updateUser(params) {

    var result;
    // Checks if there exists a user with the same id
    // Using module.exports to call the function to ease the testing
    var userFoundById = module.exports.getUserById(params.id);
    if (!_.isUndefined(userFoundById)) {

        // Then checks if there exists a user with the same name. If there exists one,
        // then the id must be the same as the object in the params
        var userFoundByName = module.exports.getUserByName(params.name);

        if (_.isUndefined(userFoundByName) || userFoundByName.id === params.id) {
            result = userRepository.updateUser(params);
        } else {
            result = messageHelper.buildErrorMessage(USR_SVC_ERR_UPDATE_USR_ALREADY_EXISTS_WITH_SAME_NAME);
        }
    } else {
        result = messageHelper.buildErrorMessage(USR_SVC_ERR_UPDATE_USR_NOT_FOUND_BY_ID);
    }

    return result;
}

function deleteUser(id) {

    var result;

    // First, obtain the user
    var myUser = module.exports.getUserById(id);

    if (!_.isUndefined(myUser)) {
        var filterParams = {
            user: myUser.name
        };
        var experiments = experimentRepository.getExperiments(filterParams);

        if (!_.isUndefined(experiments) && experiments.length > 0) {
            result = messageHelper.buildErrorMessage(USR_SVC_ERR_DELETE_ASSOCIATED_EXP_EXISTS);
        } else {
            var resultDeletion = userRepository.deleteUser(id);
            if (resultDeletion) {
                result = true;
            } else {
                result = messageHelper.buildErrorMessage(USR_SVC_ERR_DELETE_USR_NOT_FOUND_BY_ID);
            }
        }
    }
}

module.exports = {

    getUsers,
    getUserById,
    getUserByName,
    createUser,
    updateUser,
    deleteUser,
    USR_SVC_ERR_CREATE_USR_ALREADY_EXISTS_WITH_SAME_NAME,
    USR_SVC_ERR_UPDATE_USR_ALREADY_EXISTS_WITH_SAME_NAME,
    USR_SVC_ERR_UPDATE_USR_NOT_FOUND_BY_ID,
    USR_SVC_ERR_DELETE_USR_NOT_FOUND_BY_ID,
    USR_SVC_ERR_DELETE_ASSOCIATED_EXP_EXISTS
}