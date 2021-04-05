const User = require('../models/User');

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();

      return res.json(users);
    } catch (error) {
      return res.json(null);
    }
  },

  async show(req, res) {
    try {
      // eslint-disable-next-line camelcase
      const { id } = req.params;
      const user = await User.findByPk(id);

      return res.json(user);
    } catch (error) {
      return res.json(null);
    }
  },

  async store(req, res) {
    try {
      const user = await User.create(req.body);

      return res.status(201).send({ newUser: user.email });
    } catch (error) {
      return res.status(403).send(error);
    }
  },

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).send({ errors: ['Missing id'] });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).send({ errors: ['Usuário não cadastrado'] });
      }

      const updateUser = await user.update(req.body);

      return res.status(200).send(updateUser);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).send({ errors: ['Missing id'] });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).send({ errors: ['Usuário não cadastrado'] });
      }

      await user.destroy();

      return res.json(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
