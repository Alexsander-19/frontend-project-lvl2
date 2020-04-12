import fs from 'fs';
import path from 'path';

import parse from './parser';
import buildAST from './buildAST';
import render from './formatters';

const getFileType = (filePath) => path.extname(filePath).slice(1);

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(fullPath, 'UTF8');
};

const genDiff = (firstPath, secondPath, format) => {
  const firstConfigData = readFile(firstPath);
  const secondConfigData = readFile(secondPath);
  const firstConfigType = getFileType(firstPath);
  const secondConfigType = getFileType(secondPath);
  const parsedFirstConfig = parse(firstConfigData, firstConfigType);
  const parsedSecondConfig = parse(secondConfigData, secondConfigType);
  const ast = buildAST(parsedFirstConfig, parsedSecondConfig);
  return render(ast, format);
};

export default genDiff;
