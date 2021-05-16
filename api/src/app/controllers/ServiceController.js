/* eslint-disable no-console */
const { Service } = require('../models');
const { User } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const service = await Service.findAll();

      return res.status(200).json({ error: false, service });
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async show(req, res) {
    try {
      return res.status(200).json();
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async store(req, res) {
    try {
      const { provider_id } = req.params;
      const { title, duration } = req.body;

      const provider = await User.findByPk(provider_id);

      if (!provider) {
        return res.status(400).json({ error: true, message: 'User not found!' });
      }

      if (provider.scope_id !== 2) {
        return res.status(400).json({ error: true, message: 'Not a provider!' });
      }

      const [service] = await Service.findOrCreate({
        where: { title, duration },
      });

      await provider.addService(service);

      return res.status(201).json(service);
    } catch (err) {
      console.log(err);

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
