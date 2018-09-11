'use strict';

var _ = require('lodash');
var shortid = require('shortid');

////////////////////////////////////////////////////////////////////////////////
// PROPERTIES
////////////////////////////////////////////////////////////////////////////////

// Defines an initial set of users 
var users = [];

////////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function getUsers(params) {

  var usersResult = users.slice();

  // Filter by name
  if (params.name !== undefined) {
    usersResult = _.filter(users, { name: params.name });
  }

  // Order by name
  if (params.sort !== undefined) {
    if (params.sort === 'name') {
      usersResult = _.orderBy(usersResult, ['name'], ['asc']);
    } else if (params.sort === '-name') {
      usersResult = _.orderBy(usersResult, ['name'], ['desc']);
    }
  }

  return usersResult;
}

function getUserById(id) {
  return users.find(element => {
    return element.id === id;
  });
}

function getUserByName(name) {
  return users.find(element => {
    return element.name === name;
  });
}

function createUser(user) {

  var newUser = {
    id: shortid.generate(),
    name: user.name,
    description: user.description,
    image: user.image
  };

  users.push(newUser);

  return getUserById(newUser.id);
}

function updateUser(user) {

  var idToSearch = user.id;

  var userToUpdate = getUserById(idToSearch);

  if (userToUpdate !== undefined) {
    userToUpdate.name = user.name;
    userToUpdate.description = user.description;
    userToUpdate.image = user.image;
  }

  return userToUpdate;
}

function deleteUser(id) {

  var idToSearch = id;

  var userToDelete = getUserById(idToSearch);

  if (userToDelete !== undefined) {
    _.remove(users, function (element) {
      return element.id === userToDelete.id;
    });
    return true;
  } else {
    return false;
  }
}

function initDefaultUsers(usersSet) {
  users = usersSet.slice();
}

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
  initDefaultUsers
}