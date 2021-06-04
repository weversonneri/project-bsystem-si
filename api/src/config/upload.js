import multer from 'multer';
import path from 'path';

const uploadAvatar = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadAvatar,
  storage: multer.diskStorage({
    destination: uploadAvatar,
    filename(request, file, callback) {
      const filename = `${Date.now()}-${file.originalname}`;

      callback(null, filename);
    },
  }),

};
