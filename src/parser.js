import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';


const getKeys = (o) => {
  const keys = Object.keys(o);
  return keys.reduce((acc, i) => {
    if (typeof o[i] === 'object') {
      return [...acc, i, ...getKeys(o[i])];
    }
    return [...acc, i];
  }, []);
};

const getConfig = (firstPath, secondPath) => {
  const firstType = path.extname(firstPath);
  const secondType = path.extname(secondPath);
  const correctType = firstType === secondType ? firstType : false;
  if (correctType === '.json') {
    return [
      JSON.parse(fs.readFileSync(firstPath, 'UTF8')),
      JSON.parse(fs.readFileSync(secondPath, 'UTF8')),
    ];
  }
  if (correctType === '.yaml') {
    return [
      yaml.safeLoad(fs.readFileSync(firstPath, 'UTF8')),
      yaml.safeLoad(fs.readFileSync(secondPath, 'UTF8')),
    ];
  }
  if (correctType === '.ini') {
    return [
      ini.parse(fs.readFileSync(firstPath, 'UTF8')),
      ini.parse(fs.readFileSync(secondPath, 'UTF8')),
    ];
  }
  return null;
};

const parser = (firstPath, secondPath) => {
  const [firstConfig, secondConfig] = getConfig(firstPath, secondPath);
  const keys = Array.from(new Set([
    ...getKeys(firstConfig),
    ...getKeys(secondConfig),
  ]));
  return { firstConfig, secondConfig, keys };
};

export default parser;
