'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

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
