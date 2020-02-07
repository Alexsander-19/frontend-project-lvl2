const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const ini = require('ini');
const _ = require('lodash');

const getKeys = (o) => {
  const keys = Object.keys(o);
  return keys.reduce((acc, i) => {
    if (typeof o[i] === 'object') {
      return [...acc, getKeys(o[i])];
    }
    return [...acc, i];
  }, keys);
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
    ..._.flattenDeep(getKeys(firstConfig)),
    ..._.flattenDeep(getKeys(secondConfig)),
  ]));
  return { firstConfig, secondConfig, keys };
};

export default parser;
