import fs from 'fs';
import path from 'path';

import parse from './parser';
import buildAST from './buildAST';
import render from './formatters';

const getFileType = (filePath) => {
  const fileType = path.extname(filePath).slice(1);
  return fileType;
};

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath, 'UTF8');
  return data;
};

const genDiff = (firstPath, secondPath, format) => {
  const firstConfigData = readFile(firstPath);
  const seconfConfigData = readFile(secondPath);
  const firstConfigType = getFileType(firstPath);
  const secondConfigType = getFileType(secondPath);
  const parsedFirstConfig = parse(firstConfigData, firstConfigType);
  const parsedSecondConfig = parse(seconfConfigData, secondConfigType);
  const ast = buildAST(parsedFirstConfig, parsedSecondConfig);
  const diffConfig = render(ast, format);
  return diffConfig;
};

export default genDiff;
