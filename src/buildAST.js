import _ from 'lodash';

const buildAST = (data) => {
  const [firstConfig, secondConfig] = data;
  const getValue = (name, status, value = '', children = []) => {
    const result = {
      name, status, value, children,
    };
    return result;
  };
  const iter = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    return keys.map((key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
          const parent = getValue(key, 'parent', '', iter(obj1[key], obj2[key]));
          return parent;
        }
        if (obj1[key] === obj2[key]) {
          const unchangedValue = getValue(key, 'unchanged', obj1[key]);
          return unchangedValue;
        }
        const updatedValue = getValue(key, 'updated', [obj1[key], obj2[key]]);
        return updatedValue;
      }
      if (_.has(obj1, key)) {
        const removeValue = getValue(key, 'remove', obj1[key]);
        return removeValue;
      }
      const addValue = getValue(key, 'add', obj2[key]);
      return addValue;
    });
  };
  const ast = iter(firstConfig, secondConfig);
  return ast;
};

export default buildAST;
