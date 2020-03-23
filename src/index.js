import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

import parse from './parser';
import render from './formatters';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const fileType = path.extname(filePath);
  const data = {};
  if (fileType === '.json') {
    return JSON.parse(fs.readFileSync(fullPath, 'UTF8'));
  }
  if (fileType === '.yaml') {
    return yaml.safeLoad(fs.readFileSync(fullPath, 'UTF8'));
  }
  if (fileType === '.ini') {
    return ini.parse(fs.readFileSync(fullPath, 'UTF8'));
  }
  return data;
};

const genDiff = (firstPath, secondPath, format) => {
  const dataFiles = [readFile(firstPath), readFile(secondPath)];
  const ast = parse(dataFiles);
  const renderData = render(ast, format);
  return renderData;
};

export default genDiff;
