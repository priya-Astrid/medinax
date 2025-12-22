import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import fs, { existsSync } from 'fs';

export const uploadFile = (folder: string) => {
  const uploadPath = path.join(__dirname, '..', ' uploads', folder);
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${folder}-${uniqueSuffix}${ext}`);
    },
  });

  return multer({ storage });
};

// import multer  from "multer";
// import path from "path";
// import { Request } from "express";
// import fs, { existsSync } from "fs";

// const uploadPath = path.join(__dirname, '..', ' uploads','patientProfile');
// if(!fs.existsSync(uploadPath)){
//     fs.mkdirSync(uploadPath, {recursive: true});
// }

// const storage = multer.diskStorage({
//     destination:(req, file,cb)=>{
//         cb(null, uploadPath)
//     },
//     filename:(req, file, cb)=>{
//         const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()* 1e9)
//         const ext = path.extname(file.originalname);
//         cb(null, `patient-${uniqueSuffix}${ext}`);
//     }
// })
// const uploads = multer({storage});
// export default uploads;
