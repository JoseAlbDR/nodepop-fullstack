import multer from 'multer';

const fileUpload = (folder: string) => {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      let newPath = '';
      if (process.env.NODE_ENV === 'render')
        newPath = '/opt/render/project/src/build/public/uploads/';
      if (process.env.NODE_ENV === 'development')
        newPath = './src/public/uploads/';
      if (process.env.NODE_ENV === 'production')
        newPath = '/build/public/uploads/';

      cb(null, `${newPath}${folder}`);
    },
    filename: (_req, file, cb) => {
      const fileName = Date.now() + file.originalname;
      cb(null, fileName);
    },
  });

  return multer({ storage });
};

export default fileUpload;
