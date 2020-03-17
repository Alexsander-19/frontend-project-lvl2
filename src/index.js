import _ from 'lodash';
import parser from './parser';
import render from './formatters';

const genDiff = (firstPath, secondPath, format) => {
  const { firstConfig, secondConfig, keys } = parser(firstPath, secondPath);
  const iter = (obj1, obj2) => keys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
        const parent = {
          name: key, status: 'parent', value: '', children: iter(obj1[key], obj2[key]),
        };
        return [...acc, parent];
      }
      if (obj1[key] === obj2[key]) {
        const unchangedValue = { name: key, status: 'unchanged', value: obj1[key] };
        return [...acc, unchangedValue];
      }
      const updatedValue = {
        name: key, status: 'updated', value: [obj1[key], obj2[key]],
      };
      return [...acc, updatedValue];
    }
    if (_.has(obj1, key)) {
      const removeValue = { name: key, status: 'remove', value: obj1[key] };
      return [...acc, removeValue];
    }
    if (_.has(obj2, key)) {
      const addValue = { name: key, status: 'add', value: obj2[key] };
      return [...acc, addValue];
    }
    return acc;
  }, []);
  const ast = iter(firstConfig, secondConfig)
  return render(ast, format);
};

export default genDiff;
