const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Scope } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'url', 'avatar'],
        include: {
          model: Scope,
          as: 'scope',
          attributes: ['name'],
        },
        nest: true,
      });
      return res.status(200).json({ error: false, users });
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async show(req, res) {
    try {
      const { user_id } = req.params;

      const user = await User.findOne({
        where: { id: user_id },
        attributes: ['id', 'name', 'email', 'scope_id', 'url', 'avatar'],
      });

      return res.status(200).json({ error: false, user });
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async store(req, res) {
    try {
      const user = req.body;

      if (user.scope_id !== undefined) {
        return res.status(401).json({ error: true, message: 'Not authorized to change scoope!' });
      }

      await User.create(user);

      const { name, email, scope_id } = user;

      return res.status(201).json({ error: false, user: { name, email, scope_id } });
    } catch (err) {
      return res.status(403).json({ error: true, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const { body } = req;

      const user = await User.findOne({
        where: { id: req.userId },
        include: {
          model: Scope,
          as: 'scope',
          attributes: ['name'],
        },
      });

      if (body.password) {
        const compare = await bcrypt.compare(body.oldPassword, user.password_hash);

        if (compare !== true) {
          return res.status(401).json({ error: true, message: 'Incorrect password' });
        }
      }

      if (body.scope_id !== undefined) {
        return res.status(401).json({ error: true, message: 'Not authorized to change scoope!' });
      }

      if (!user) {
        return res.status(400).json({ error: true, message: 'User not found!' });
      }

      await user.update(req.body);

      return res.status(200).json({
        error: false,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          url: user.url,
          avatar: user.avatar,
          scopes: [user.scope.name],
        },
      });
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ error: true, message: 'User not found!' });
      }

      await user.destroy();

      return res.status(200).json({ error: false, message: null });
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async scope(req, res) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: true, message: 'Login required!' });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
      if (!token) {
        return res.status(401).json({ error: true, message: 'Not authorized!' });
      }

      const data = jwt.decode(token);

      if (!data) {
        return res.status(401).json({ error: true, message: 'Not authorized!' });
      }

      const { sub } = data;

      const user = await User.findOne({
        where: {
          id: sub,
        },
        include: {
          model: Scope,
          attributes: ['name'],
          as: 'scope',
        },
        raw: true,
        nest: true,
      });

      const { name } = user.scope;

      return res.status(200).json({ error: false, message: name });
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

};
