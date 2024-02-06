import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    cb(null, join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadPicture = multer({
  storage,
  limits: {
    fileSize: 1 * 1000000, // 1MB
  },
  fileFilter: function (req, file, cb) {
    let ext = extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});
