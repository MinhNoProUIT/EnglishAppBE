const { uploadToCloudinary } = require('../services/UploadService');

const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });
    const result = await uploadToCloudinary(file.buffer);
    res.status(200).json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

module.exports = { uploadImage };
