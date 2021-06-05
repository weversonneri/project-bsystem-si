const path = require('path');
const fs = require('fs');
const { User } = require('../models');
const uploadConfig = require('../../config/upload');

module.exports = {
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      const { filename } = req.file;

      if (!user) {
        return res.status(400).json({ error: true, message: 'User not found!' });
      }

      if (user.avatar) {
        const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
        const hasAvatar = await fs.promises.stat(userAvatarFilePath);

        if (hasAvatar) {
          await fs.promises.unlink(userAvatarFilePath);
        }
      }

      user.avatar = filename;

      await user.save();

      return res.status(201).json({ error: false, user });
    } catch (err) {
      return res.status(403).json({ error: true, message: err.message });
    }
  },
};
