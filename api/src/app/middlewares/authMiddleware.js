const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Login required!' });
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);

    const { sub, email } = data;

    const user = await User.findOne({
      where: {
        id: sub,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid user.' });
    }

    req.userId = sub;
    req.userEmail = email;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

module.exports = authMiddleware;
