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
const parser = (firstPath, secondPath) => {
  const firstType = path.extname(firstPath);
  const secondType = path.extname(secondPath);
  const correctType = firstType === secondType ? firstType : false;
  let firstConfig;
  let secondConfig;
  if (correctType === '.json') {
    firstConfig = JSON.parse(fs.readFileSync(firstPath, 'UTF8'));
    secondConfig = JSON.parse(fs.readFileSync(secondPath, 'UTF8'));
  } else if (correctType === '.yaml') {
    firstConfig = yaml.safeLoad(fs.readFileSync(firstPath, 'UTF8'));
    secondConfig = yaml.safeLoad(fs.readFileSync(secondPath, 'UTF8'));
  } else if (correctType === '.ini') {
    firstConfig = ini.parse(fs.readFileSync(firstPath, 'UTF8'));
    secondConfig = ini.parse(fs.readFileSync(secondPath, 'UTF8'));
  }
  const keys = Array.from(new Set([
    ..._.flattenDeep(getKeys(firstConfig)),
    ..._.flattenDeep(getKeys(secondConfig)),
  ]));
  return { firstConfig, secondConfig, keys };
};

export default parser;
