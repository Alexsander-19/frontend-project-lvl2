import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

const readFile = (filePath) => {
  const fileType = path.extname(filePath);
  if (fileType === '.json') {
    return JSON.parse(fs.readFileSync(filePath, 'UTF8'));
  }
  if (fileType === '.yaml') {
    return yaml.safeLoad(fs.readFileSync(filePath, 'UTF8'));
  }
  if (fileType === '.ini') {
    return ini.parse(fs.readFileSync(filePath, 'UTF8'));
  }
  return null;
};

const getKeys = (obj) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, i) => {
    if (obj[i] instanceof Object) {
      return [...acc, i, ...getKeys(obj[i])];
    }
    return [...acc, i];
  }, []);
};

const parser = (firstPath, secondPath) => {
  const firstConfig = readFile(firstPath);
  const secondConfig = readFile(secondPath);
  const keys = Array.from(new Set([
    ...getKeys(firstConfig),
    ...getKeys(secondConfig),
  ]));
  return { firstConfig, secondConfig, keys };
};

export default parser;
