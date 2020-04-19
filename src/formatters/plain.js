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
    const beginValue = buildValue(node.value.beginValue);
    const endValue = buildValue(node.value.endValue);
    const newACC = `${acc}${name}.`;
    switch (status) {
      case 'parent':
        return iter(children, newACC);
      case 'updated':
        return `Property ${acc}${name} was updated. From ${endValue} to ${beginValue}`;
      case 'added':
        return `Property ${acc}${name} was added with value: ${beginValue}`;
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
