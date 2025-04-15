const multer = require("multer");
const path = require("path");

const createStorage = (uploadPath) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/zip",
    "text/plain",
    "application/x-zip-compressed",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only PDF, DOC, DOCX, ZIP, and TXT files are allowed."
      ),
      false
    );
  }
};

const createUploader = (uploadPath) =>
  multer({
    storage: createStorage(uploadPath),
    fileFilter: fileFilter,
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB limit
    },
  });

module.exports = createUploader;
