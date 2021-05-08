/* eslint-disable no-console */
const { User } = require('../models');
const { Scope } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email'],
        include: {
          model: Scope,
          attributes: ['name'],
        },
        raw: true,
        nest: true,
      });
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findOne({
        where: { id },
        attributes: ['id', 'name', 'email', 'scope_id'],
      });

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async store(req, res) {
    try {
      const user = req.body;

      await User.create(user);

      const { name, email, scope_id } = user;

      console.log({ name, email, scope_id });
      return res.status(201).json({ name, email, scope_id });
    } catch (err) {
      console.log(err);

      return res.status(403).json({ error: true, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found!' });
      }

      await user.update(req.body);

      const { name, email } = user;

      return res.status(200).json({ name, email });
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found!' });
      }

      await user.destroy();

      return res.status(200).json(null);
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

};
