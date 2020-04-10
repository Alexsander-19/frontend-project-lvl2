import { isObject } from 'lodash';

const plain = (ast) => {
  const iter = (items, ac, acc) => {
    const [first, ...rest] = items;
    if (!first) {
      return acc;
    }
    if (first.status === 'parent') {
      const newACC = iter(first.children, `${ac}${first.name}.`, acc);
      return iter(rest, ac, newACC);
    }
    if (first.status === 'updated') {
      const value1 = isObject(first.value[0]) ? '[complex value]' : first.value[0];
      const value2 = isObject(first.value[1]) ? '[complex value]' : first.value[1];
      const newACC = [...acc, `Property ${ac}${first.name} was updated. From ${value1} to ${value2}`];
      return iter(rest, ac, newACC);
    }
    if (first.status === 'add') {
      const value = isObject(first.value) ? '[complex value]' : first.value;
      const newACC = [...acc, `Property ${ac}${first.name} was added with value: ${value}`];
      return iter(rest, ac, newACC);
    }
    if (first.status === 'remove') {
      const newACC = [...acc, `Property ${ac}${first.name} was removed`];
      return iter(rest, ac, newACC);
    }
    return iter(rest, ac, acc);
  };
  return iter(ast, '', []).join('\n');
};

export default plain;
