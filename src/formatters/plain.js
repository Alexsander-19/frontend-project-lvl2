import { isObject, flattenDeep } from 'lodash';

const buildValue = (obj) => {
  if (!isObject(obj)) {
    return obj;
  }
  return '[complex value]';
};

const plain = (ast) => {
  const iter = (items, acc) => items.map((i) => {
    const { status, children, name } = i;
    const currentValue = buildValue(i.value.currentValue);
    const lostValue = buildValue(i.value.lostValue);
    const newACC = `${acc}${name}.`;
    switch (status) {
      case 'parent':
        return iter(children, newACC);
      case 'updated':
        return `Property ${acc}${name} was updated. From ${lostValue} to ${currentValue}`;
      case 'added':
        return `Property ${acc}${name} was added with value: ${currentValue}`;
      case 'removed':
        return `Property ${acc}${name} was removed`;
      default:
        return null;
    }
  });
  const result = flattenDeep(iter(ast, ''));
  const removedNull = result.filter((i) => i !== null);
  return removedNull.join('\n');
};

export default plain;
