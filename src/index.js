const _ = require('lodash');
const fs = require('fs');

const genDiff = (firstConfig, secondConfig) => {
  const conf1 = JSON.parse(fs.readFileSync(firstConfig, 'UTF8'));
  const conf2 = JSON.parse(fs.readFileSync(secondConfig, 'UTF8'));
  const keys = Array.from(new Set([...Object.keys(conf1), ...Object.keys(conf2)]));
  const result = keys.reduce((acc, key) => {
    if (_.has(conf1, key) && _.has(conf2, key)) {
      if (conf1[key] === conf2[key]) {
        return { ...acc, [key]: conf1[key] };
      }
      const newKeyAdd = `+ ${key}`;
      const newKeyRub = `- ${key}`;
      return { ...acc, [newKeyRub]: conf1[key], [newKeyAdd]: conf2[key] };
    }
    if (_.has(conf1, key)) {
      const newKeyRub = `- ${key}`;
      return { ...acc, [newKeyRub]: conf1[key] };
    }
    const newKeyAdd = `+ ${key}`;
    return { ...acc, [newKeyAdd]: conf2[key] };
  }, {});
  return JSON.stringify(result);
};

export default genDiff;
