const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Scope } = require('../models');

module.exports = {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
        include: {
          model: Scope,
          attributes: ['name'],
        },
        raw: true,
        nest: true,
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found!' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Incorrect email or password!' });
      }

      const token = jwt.sign(
        {
          sub: user.id,
          email: user.email,
          scopes: [user.Scope.name],
        }, process.env.TOKEN_SECRET,
        {
          expiresIn: process.env.TOKEN_EXPIRATION,
        },
      );

      return res.json({
        token,
        Name: user.name,
        Email: user.email,
        Scope: user.scope_id,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
};
