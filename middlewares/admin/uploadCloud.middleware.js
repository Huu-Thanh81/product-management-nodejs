require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
module.exports.upload = async (req, res, next) => {
  try {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    if (req.file) {
      const result = await streamUpload(req);
      // Lưu link Cloudinary vào body
      req.body[req.file.fieldname] = result.secure_url;
    }
    next();
  } catch (error) {
    console.log(error);
    next(error); //Express sẽ bỏ qua các middleware bình thường phía sau. Mà sẽ đi tìm middleware xử lý lỗi.
  }
};
