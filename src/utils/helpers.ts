import path from 'path';

const getFileExtention = (filename: string) => {
  return path.extname(filename).replace('.', '');
};

export default {
  getFileExtention
};
