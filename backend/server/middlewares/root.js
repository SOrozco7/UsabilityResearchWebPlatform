exports.ensureRoot = (req, res, next) => { // eslint-disable-line consistent-return
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'The request does not contain the authorization header.' });
  }
  next();
};
