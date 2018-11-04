const jwt = require('jwt-simple');
const moment = require('moment');

const KEY = 'clave_secreta_proyecto';
const expirationTime = 600;

exports.createToken = (user) => {
  const payload = {
    id: user.id,
    system_role: user.system_role,
    iat: moment().unix(),
    exp: moment().add(expirationTime, 'second').unix,
  };

  const jwtToken = jwt.encode(payload, KEY);

  return { token: jwtToken, expirationTime };
};
