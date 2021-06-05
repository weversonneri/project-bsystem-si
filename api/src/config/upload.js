const multer = require('multer');
const path = require('path');

const uploadAvatar = path.resolve(__dirname, '..', '..', 'uploads');

module.exports = {
  directory: uploadAvatar,
  storage: multer.diskStorage({
    destination: uploadAvatar,
    filename(request, file, callback) {
      const filename = `${Date.now()}-${file.originalname}`;

      callback(null, filename);
    },
  }),

};
