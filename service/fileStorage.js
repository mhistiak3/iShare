const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDiractory = "./uploads";
    if (!fs.existsSync(uploadDiractory)) {
      fs.mkdirSync(uploadDiractory);
    }
    cb(null, uploadDiractory);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.upload = multer({ storage });
