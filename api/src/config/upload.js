const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const path = require('path');
require('dotenv').config();

const tempUploadAvatar = path.resolve(__dirname, '..', '..', 'temp', 'uploads', 'images');

const storageTypes = {
  local: multer.diskStorage({
    destination: tempUploadAvatar,
    filename(req, file, cb) {
      file.key = `${Date.now()}-${file.originalname}`;

      cb(null, file.key);
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;

      cb(null, filename);
    },
  }),
};

module.exports = {
  dest: tempUploadAvatar,
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
};
