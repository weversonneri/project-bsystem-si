const User = require('../model/User');

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();

      res.json(users);
    } catch (error) {
      res.status(401).json('error');
    }
  },

  async show(req, res) {
    // eslint-disable-next-line camelcase
    const user = await User.findByPk(req.params.id);

    return res.json(user);
  },

  async store(req, res) {
    try {
      // eslint-disable-next-line camelcase
      const { name, email, password_hash } = req.body;

      const user = await User.create({ name, email, password_hash });

      res.status(200).send(user);
    } catch (error) {
      res.status(403).send({ errors: error.errors.map((err) => err.message) });
    }
  },

  async delete(req, res) {
    // eslint-disable-next-line camelcase
    const user = await User.findByPk(req.params.id);

    await user.destroy();

    return res.json(user);
  },
};
