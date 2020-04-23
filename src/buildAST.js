import _ from 'lodash';

const buildNode = (name, status, value, children = null) => (
  {
    name,
    status,
    value,
    children,
  });

const buildAST = (firstConfig, secondConfig) => {
  const iter = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    return keys.map((key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          return buildNode(key, 'parent', {}, iter(obj1[key], obj2[key]));
        }
        if (obj1[key] === obj2[key]) {
          return buildNode(key, 'unchanged', { newValue: obj2[key] });
        }
        return buildNode(key, 'updated', { newValue: obj2[key], oldValue: obj1[key] });
      }
      if (_.has(obj1, key)) {
        return buildNode(key, 'removed', { oldValue: obj1[key] });
      }
      return buildNode(key, 'added', { newValue: obj2[key] });
    });
  };
  return iter(firstConfig, secondConfig);
};

export default buildAST;
