import fs from 'fs';
import path from 'path';

export const deleteImageFile = (filename: string) => {
  try {
    const filePath = path.join(process.cwd(),'uploads', filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('file delete failed', error);
  }
};
