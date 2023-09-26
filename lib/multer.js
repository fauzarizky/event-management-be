const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, __dirname + "/../public");
  },
  filename: (req, file, cb) => {
    cb(null, "IMG-" + Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;

  switch(mimetype){
    case "image/jpeg": 
    case "image/png":
    case "image/webp":
      cb(null, true);
      break;
    default:
      cb(new Error("File format is not accepted"));
      break;
  }
};

exports.multerUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1e+7
    }
})
