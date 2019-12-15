const _ = require('lodash');
const fs = require('fs');

const genDiff = (firstConfig, secondConfig) => {
  const conf1 = JSON.parse(fs.readFileSync(firstConfig, 'UTF8'));
  const conf2 = JSON.parse(fs.readFileSync(secondConfig, 'UTF8'));
  const keys = Array.from(new Set([...Object.keys(conf1), ...Object.keys(conf2)]));
  const result = keys.reduce((acc, key) => {
    if (_.has(conf1, key) && _.has(conf2, key)) {
      if (conf1[key] === conf2[key]) {
        return `${acc}    ${key}: ${conf1[key]}\n`;
      }
      return `${acc}  - ${key}: ${conf1[key]}\n  + ${key}: ${conf2[key]}\n`;
    }
    if (_.has(conf1, key)) {
      return `${acc}  - ${key}: ${conf1[key]}\n`;
    }
    return `${acc}  + ${key}: ${conf2[key]}\n`;
  }, '');
  return `{\n${result}}`;
};

export default genDiff;
