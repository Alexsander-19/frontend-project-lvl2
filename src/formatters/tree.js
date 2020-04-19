import { isObject, flattenDeep } from 'lodash';

const buildValue = (obj, space) => {
  if (!isObject(obj)) {
    return obj;
  }
  const keys = Object.keys(obj);
  const value = keys.map((key) => `${' '.repeat(space + 4)}${key}: ${obj[key]}\n`);
  return `{\n${value.join('')}${' '.repeat(space)}}`;
};

const render = (ast) => {
  const iter = (tree, space) => tree.map((node) => {
    const { status, name, children } = node;
    const beginValue = buildValue(node.value.beginValue, space);
    const endValue = buildValue(node.value.endValue, space);
    const removed = `${' '.repeat(space - 2)}- ${name}: ${endValue}`;
    const added = `${' '.repeat(space - 2)}+ ${name}: ${beginValue}`;
    const unchanged = `${' '.repeat(space)}${name}: ${beginValue}`;
    switch (status) {
      case 'parent':
        return [`${' '.repeat(space)}${name}: {`, iter(children, space + 4), `${' '.repeat(space)}}`];
      case 'updated':
        return [added, removed];
      case 'added':
        return added;
      case 'removed':
        return removed;
      case 'unchanged':
        return unchanged;
      default:
        throw new Error(`unexpected status - ${status}`);
    }
  });
  const result = flattenDeep(iter(ast, 4));
  return `{\n${result.join('\n')}\n}`;
};

export default render;
