const cloudinary = require('../config/cloudinary.config');
const streamifier = require('streamifier');

const uploadToCloudinary = (buffer, folder = 'english-app') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = { uploadToCloudinary };
