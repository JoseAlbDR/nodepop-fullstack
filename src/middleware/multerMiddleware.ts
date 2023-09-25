import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    console.log(req);
    cb(null, './src/public/uploads');
  },
  filename: (_req, file, cb) => {
    const fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
