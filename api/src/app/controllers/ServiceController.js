/* eslint-disable no-console */
const { Service } = require('../models');
const { User } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const services = await Service.findAll({
        attributes: ['id', 'title', 'description', 'duration'],
        // include: [
        //   {
        //     model: User,
        //     as: 'providers',
        //     attributes: ['id', 'name', 'email', 'url', 'avatar'],
        //     through: {
        //       attributes: [],
        //     },
        //     where: {
        //       scope_id: 2,
        //     },
        //   }],
        nest: true,
      });

      return res.status(200).json({ error: false, services });
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  // async show(req, res) {
  //   try {
  //     return res.status(200).json();
  //   } catch (err) {
  //     return res.status(400).json({ error: true, message: err.message });
  //   }
  // },

  async store(req, res) {
    try {
      const { provider_id } = req.params;
      const { title, duration, description } = req.body;

      const provider = await User.findByPk(provider_id);

      if (!provider) {
        return res.status(400).json({ error: true, message: 'User not found!' });
      }

      if (provider.scope_id !== 2) {
        return res.status(400).json({ error: true, message: 'Not a provider!' });
      }

      const [service] = await Service.findOrCreate({
        where: { title, duration, description },
      });

      await provider.addService(service);

      return res.status(201).json(service);
    } catch (err) {
      return res.status(403).json({ error: true, message: err.message });
    }
  },

  async update(req, res) {
    try {
      return res.status(200).json({});
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      return res.status(200).json(null);
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

};
