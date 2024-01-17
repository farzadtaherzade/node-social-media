const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(path.join(process.cwd(), "public", "uploads"), {
      recursive: true,
    });
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const format = path.extname(file.originalname);
    const filename = new Date().getTime().toString() + format;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 12 * 1000 * 1000,
  },
  fileFilter: (req, file, cb) => {
    const fieldName = file.fieldname;
    let messageError = "format of file are wrong";
    let FormatValidation = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];
    const VideoWhiteListFormat = ["video/mp4", "video/mkv"];
    if (fieldName == "content") {
      VideoWhiteListFormat.map((item) => {
        FormatValidation.push(item);
      });
    }
    if (FormatValidation.includes(file.mimetype)) {
      return cb(null, true);
    }
    cb(new createHttpError.BadRequest(messageError));
  },
});

module.exports = {
  upload,
};
