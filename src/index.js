import fs from 'fs';
import path from 'path';

import parse from './parser';
import buildAST from './buildAST';
import render from './formatters';

const getFileType = (filePath) => {
  const fileType = path.extname(filePath);
  return fileType;
};

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath, 'UTF8');
  return data;
};

const genDiff = (firstPath, secondPath, format) => {
  const data1 = readFile(firstPath);
  const data2 = readFile(secondPath);
  const processedData = [
    parse(data1, getFileType(firstPath)),
    parse(data2, getFileType(secondPath)),
  ];
  const ast = buildAST(processedData);
  const diffData = render(ast, format);
  return diffData;
};

export default genDiff;
