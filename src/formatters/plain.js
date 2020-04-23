import { isObject, flattenDeep } from 'lodash';

const buildValue = (obj) => {
  if (!isObject(obj)) {
    return obj;
  }
  return '[complex value]';
};

const plain = (ast) => {
  const iter = (tree, acc) => tree.map((node) => {
    const { status, children, name } = node;
    const newValue = buildValue(node.value.newValue);
    const oldValue = buildValue(node.value.oldValue);
    const newACC = `${acc}${name}.`;
    switch (status) {
      case 'parent':
        return iter(children, newACC);
      case 'updated':
        return `Property ${acc}${name} was updated. From ${oldValue} to ${newValue}`;
      case 'added':
        return `Property ${acc}${name} was added with value: ${newValue}`;
      case 'removed':
        return `Property ${acc}${name} was removed`;
      case 'unchanged':
        return '';
      default:
        throw new Error(`unexpected status - ${status}`);
    }
  });
  const result = flattenDeep(iter(ast, ''));
  const removedEmptyString = result.filter((i) => i !== '');
  return removedEmptyString.join('\n');
};

export default plain;
