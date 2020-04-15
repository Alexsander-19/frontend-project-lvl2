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
  const iter = (items, space) => items.map((i) => {
    const { status, name, children } = i;
    const currentValue = buildValue(i.value.currentValue, space);
    const lostValue = buildValue(i.value.lostValue, space);
    const removed = `${' '.repeat(space - 2)}- ${name}: ${lostValue}`;
    const added = `${' '.repeat(space - 2)}+ ${name}: ${currentValue}`;
    const unchanged = `${' '.repeat(space)}${name}: ${currentValue}`;
    switch (status) {
      case 'parent':
        return [`${' '.repeat(space)}${name}: {`, iter(children, space + 4), `${' '.repeat(space)}}`];
      case 'updated':
        return [added, removed];
      case 'added':
        return added;
      case 'removed':
        return removed;
      default:
        return unchanged;
    }
  });
  const result = flattenDeep(iter(ast, 4));
  return `{\n${result.join('\n')}\n}`;
};

export default render;
