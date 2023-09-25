import multer from 'multer';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './src/public/uploads');
  },
  filename: (_req, file, cb) => {
    const fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
