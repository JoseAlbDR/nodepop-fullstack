import multer from 'multer';

const fileUpload = (folder: string) => {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(
        null,
        `${
          process.env.NODE_ENV === 'development'
            ? './src/public/uploads/'
            : './build/public/uploads/'
        }${folder}`
      );
    },
    filename: (_req, file, cb) => {
      const fileName = Date.now() + file.originalname;
      cb(null, fileName);
    },
  });

  return multer({ storage });
};

export default fileUpload;
