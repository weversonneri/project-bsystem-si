const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Scope } = require('../models');

module.exports = {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        attributes: ['id', 'name', 'email', 'password_hash', 'scope_id', 'url', 'avatar'],
        where: { email },
        include: {
          model: Scope,
          as: 'scope',
          attributes: ['name'],
        },
        nest: true,
      });

      if (!user) {
        return res.status(401).json({ error: true, message: 'User not found!' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        return res.status(403).json({ error: true, message: 'Incorrect email or password!' });
      }

      const token = jwt.sign(
        {
          sub: user.id,
          email: user.email,
          scopes: [user.scope.name],
        }, process.env.TOKEN_SECRET,
        {
          expiresIn: process.env.TOKEN_EXPIRATION,
        },
      );

      return res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          url: user.url,
          scopes: [user.scope.name],
        },
      });
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },
};
