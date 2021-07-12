const path = require('path');
const fs = require('fs');
const aws = require('aws-sdk');
const { User } = require('../models');
const { Scope } = require('../models');
const uploadConfig = require('../../config/upload');

module.exports = {
  async update(req, res) {
    try {
      const user = await User.findOne({
        where: { id: req.userId },
        include: {
          model: Scope,
          as: 'scope',
          attributes: ['name'],
        },
      });
      const { key, location: url = '' } = req.file;
      const s3 = new aws.S3();

      if (!user) {
        return res.status(400).json({ error: true, message: 'User not found!' });
      }

      if (process.env.STORAGE_TYPE === 's3') {
        if (user.avatar) {
          s3.deleteObject({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: user.avatar,
          }).promise()
            .then((response) => {
              console.log(response);
            })
            .catch((response) => {
              console.log(response);
            });
        }

        user.avatar = key;
        user.url = url;
      } else {
        if (user.avatar) {
          const userAvatarFilePath = path.join(uploadConfig.dest, user.avatar);
          const hasAvatar = await fs.promises.stat(userAvatarFilePath);

          if (hasAvatar) {
            await fs.promises.unlink(userAvatarFilePath);
          }
        }

        user.avatar = key;
        user.url = url;
      }

      await user.save();

      return res.status(201).json({
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
      return res.status(403).json({ error: true, message: err.message });
    }
  },
};
