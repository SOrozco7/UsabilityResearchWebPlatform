const jwt = require('jwt-simple');
const moment = require('moment');
const KEY = 'clave_secreta_proyecto';

exports.ensureRoot = (req, res, next) => {
	if(!req.headers.authorization){
		return res.status(403).send({ message: 'The request does not contain the authorization header.'});
	}

	console.log(req.user);

	next(); 
};