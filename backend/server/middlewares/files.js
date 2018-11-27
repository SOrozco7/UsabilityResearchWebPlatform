// Multer handles parsing multipart/form-data requests.
// This instance is configured to store images in memory.
// This makes it straightforward to upload to Cloud Storage.
const Multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const config = require('../config/cloud');

exports.multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

const storage = new Storage({
  projectId: config.PROJECT_ID,
});

const bucket = storage.bucket(config.CLOUD_BUCKET);

const getPublicUrl = filename => `https://storage.googleapis.com/${config.CLOUD_BUCKET}/${filename}`;

exports.sendUploadToGCS = (req, res, next) => { // eslint-disable-line consistent-return
  if (!req.file) {
    return next();
  }

  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
    resumable: false,
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
};
