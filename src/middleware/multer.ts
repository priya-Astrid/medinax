import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import fs, { existsSync } from 'fs';

export const uploadFile = (folder: string) => {
  const uploadPath = path.join(process.cwd(), 'uploads', folder);
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${folder}-${uniqueSuffix}${ext}`);
    },
  });
  const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    const allowedTypes = ['image/jpeg','image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  };

  return multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });
};

// import multer from 'multer';
// import path from 'path';
// import { Request } from 'express';
// import fs, { existsSync } from 'fs';

// export const uploadFile = (folder: string) => {
//   const uploadPath = path.join(__dirname, '..', 'uploads', folder);
//   if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath, { recursive: true });
//   }

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       const ext = path.extname(file.originalname);
//       cb(null, `${folder}-${uniqueSuffix}${ext}`);
//     },
//   });

//   return multer({ storage });
// };
