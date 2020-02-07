import parser from './parser';
import render from './formatters';

const _ = require('lodash');

const genDiff = (firstPath, secondPath, format) => {
  const { firstConfig, secondConfig, keys } = parser(firstPath, secondPath);
  const getAST = (ob1, ob2) => keys.reduce((acc, i) => {
    if (_.has(ob1, i) && _.has(ob2, i)) {
      if (ob1[i] instanceof Object && ob2[i] instanceof Object) {
        const conf = {
          name: i, status: '', value: '', children: getAST(ob1[i], ob2[i]),
        };
        return [...acc, conf];
      }
      if (ob1[i] === ob2[i]) {
        const conf = { name: i, status: '', value: ob1[i] };
        return [...acc, conf];
      }
      const upd = {
        name: i, status: 'updated', value: [ob1[i], ob2[i]],
      };
      return [...acc, upd];
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
  return render(getAST(firstConfig, secondConfig), format);
};

export default genDiff;
