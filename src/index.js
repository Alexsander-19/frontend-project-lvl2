import parser from './parsers';
import render from './render';

const _ = require('lodash');

const genDiff = (firstPath, secondPath) => {
  const { firstConfig, secondConfig } = parser(firstPath, secondPath);
  const getKeys = (o) => {
    const keys = Object.keys(o);
    return keys.reduce((acc, i) => {
      if (typeof o[i] === 'object') {
        return [...acc, getKeys(o[i])];
      }
      return [...acc, i];
    }, keys);
  };
  const keys = Array.from(new Set([
    ..._.flattenDeep(getKeys(firstConfig)),
    ..._.flattenDeep(getKeys(secondConfig)),
  ]));
  const getAST = (ob1, ob2) => keys.reduce((acc, i) => {
    if (_.has(ob1, i) && _.has(ob2, i)) {
      if (ob1[i] instanceof Object && ob2[i] instanceof Object) {
        const conf = {
          name: i, status: 'parent', value: '', children: getAST(ob1[i], ob2[i]),
        };
        return [...acc, conf];
      }
      if (ob1[i] === ob2[i]) {
        const conf = { name: i, status: 'no', value: ob1[i] };
        return [...acc, conf];
      }
      const addConf = { name: i, status: 'add', value: ob2[i] };
      const remConf = { name: i, status: 'remove', value: ob1[i] };
      return [...acc, addConf, remConf];
    }
    if (_.has(ob1, i)) {
      const addConf = { name: i, status: 'remove', value: ob1[i] };
      return [...acc, addConf];
    }
    if (_.has(ob2, i)) {
      const remConf = { name: i, status: 'add', value: ob2[i] };
      return [...acc, remConf];
    }
    return acc;
  }, []);
  return render(getAST(firstConfig, secondConfig));
};

export default genDiff;
