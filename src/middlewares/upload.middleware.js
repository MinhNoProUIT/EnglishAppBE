const multer = require('multer');

const storage = multer.memoryStorage();

const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only .jpg, .jpeg, and .png files are allowed!'), false);
    }
    cb(null, true);
  },
});

module.exports = uploadImage;
