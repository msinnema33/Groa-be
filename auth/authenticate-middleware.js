const jwt = require('jsonwebtoken');

// ---------- Function for creating and signing token ----------- //

function signToken(user) {
  const payload = {
    username: user.username
  };

  const secret = process.env.JWT_SECRET || "secret code";

  const options = {
    expiresIn: "8h"
  };

  return jwt.sign(payload, secret, options);
}

const authToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const secret = process.env.JWT_SECRET || 'secret code';

    jwt.verify(authorization, secret, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate user' });
      } else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'Please login and try again' });
  }
};

module.exports = {
  signToken,
  authToken
}