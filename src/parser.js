import _ from 'lodash';

const parse = (data) => {
  const [firstConfig, secondConfig] = data;
  const iter = (obj1, obj2) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    const keys = Array.from(new Set([...obj1Keys, ...obj2Keys]));
    return keys.map((key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
          const parent = {
            name: key, status: 'parent', value: '', children: iter(obj1[key], obj2[key]),
          };
          return parent;
        }
        if (obj1[key] === obj2[key]) {
          const unchangedValue = { name: key, status: 'unchanged', value: obj1[key] };
          return unchangedValue;
        }
        const updatedValue = {
          name: key, status: 'updated', value: [obj1[key], obj2[key]],
        };
        return updatedValue;
      }
      if (_.has(obj1, key)) {
        const removeValue = { name: key, status: 'remove', value: obj1[key] };
        return removeValue;
      }
      const addValue = { name: key, status: 'add', value: obj2[key] };
      return addValue;
    });
  };
  const ast = iter(firstConfig, secondConfig);
  return ast;
};

export default parse;
