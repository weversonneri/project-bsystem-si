const { User } = require('../models');
const { Service } = require('../models');
// const { Scope } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const providers = await User.findAll({
        attributes: ['id', 'name', 'email'],
        where: {
          scope_id: 2,
        },
        include: [
          {
            model: Service,
            as: 'services',
            attributes: ['id', 'title'],
            through: {
              attributes: [],
            },
          }],
        raw: true,
        nest: true,
      });
      return res.status(200).json({ error: false, providers });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async store(req, res) {
    try {
      const {
        name,
        email,
        password,
        scope_id,
      } = req.body;

      if (scope_id !== undefined) {
        return res.status(401).json({ error: true, message: 'Not authorized to change scoope!' });
      }

      await User.create({
        name,
        email,
        password,
        scope_id: 2,
      });

      return res.status(201).json({ error: false, user: { name, email, scope_id } });
    } catch (err) {
      return res.status(403).json({ error: true, message: err.message });
    }
  },
};
