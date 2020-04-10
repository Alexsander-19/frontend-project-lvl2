import _ from 'lodash';

const buildAST = (firstConfig, secondConfig) => {
  const buildNode = (name, status, value = '', children = []) => {
    const result = {
      name, status, value, children,
    };
    return result;
  };
  const iter = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    return keys.map((key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          return buildNode(key, 'parent', '', iter(obj1[key], obj2[key]));
        }
        if (obj1[key] === obj2[key]) {
          return buildNode(key, 'unchanged', obj1[key]);
        }
        return buildNode(key, 'updated', [obj1[key], obj2[key]]);
      }
      if (_.has(obj1, key)) {
        return buildNode(key, 'remove', obj1[key]);
      }
      return buildNode(key, 'add', obj2[key]);
    });
  };
  const ast = iter(firstConfig, secondConfig);
  return ast;
};

export default buildAST;
