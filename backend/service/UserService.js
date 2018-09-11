'use strict';


/**
 * Request authentication
 * This method logs the user in.
 *
 * body User User object that needs to be logged in.
 * returns List
 **/
exports.login = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "password" : "password",
  "id" : 0,
  "email" : "email",
  "username" : "username"
}, {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "password" : "password",
  "id" : 0,
  "email" : "email",
  "username" : "username"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

