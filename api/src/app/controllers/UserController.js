/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
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
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },

  async show(req, res) {
    try {
      const id = req.userId;

      const user = await User.findOne({
        where: { id },
        attributes: ['id', 'name', 'email', 'scope_id'],
      });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(null);
    }
  },

  async store(req, res) {
    try {
      const user = req.body;

      await User.create(user);

      const { name, email, scope_id } = user;

      console.log({ name, email, scope_id });
      return res.status(201).json({ name, email, scope_id });
    } catch (error) {
      console.log(error);

      return res.status(403).json(error);
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ errors: 'User not found!' });
      }

      await user.update(req.body);

      const { name, email } = user;

      return res.status(200).json({ name, email });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ errors: 'User not found!' });
      }

      await user.destroy();

      return res.status(200).json(null);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async scope(req, res) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: 'Login required!' });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
      if (!token) {
        return res.status(401).json({ message: 'Nor authorized!' });
      }

      const data = jwt.decode(token);

      if (!data) {
        return res.status(401).json({ message: 'Nor authorized!' });
      }

      const { sub } = data;

      const user = await User.findOne({
        where: {
          id: sub,
        },
        include: {
          model: Scope,
          attributes: ['name'],
        },
        raw: true,
        nest: true,
      });

      return res.status(200).json(user.Scope.name);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },

};
