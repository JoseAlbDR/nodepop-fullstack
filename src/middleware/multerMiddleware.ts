import multer from 'multer';

/**
 * Middleware function for handling file uploads.
 *
 * @param folder - The folder where uploaded files will be stored.
 * @returns A multer instance with the specified storage configuration.
 */
const fileUpload = (folder: string) => {
  const storage = multer.diskStorage({
    destination: (req, _file, cb) => {
      let newPath = '';

      // Determine the file upload path based on the environment
      if (process.env.NODE_ENV === 'development') {
        newPath = `src/public/uploads/${req.user.userId}`;
      }
      if (process.env.NODE_ENV === 'production') {
        newPath = `build/public/uploads/${req.user.userId}`;
      }

      // Set the destination folder for storing the uploaded files
      cb(null, `${newPath}/${folder}`);
    },
    filename: (_req, file, cb) => {
      // Generate a unique filename for the uploaded file
      const fileName = Date.now() + file.originalname;
      cb(null, fileName);
    },
  });

  // Create and return a multer instance with the specified storage configuration
  return multer({ storage });
};

export default fileUpload;
