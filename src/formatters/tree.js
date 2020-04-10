import { isObject } from 'lodash';

const getValue = (obj, space) => {
  if (isObject(obj)) {
    const keys = Object.keys(obj);
    const value = keys.map((key) => `${' '.repeat(space + 4)}${key}: ${obj[key]}\n`);
    return `{\n${value.join('')}${' '.repeat(space)}}`;
  }
  return obj;
};

const render = (ast) => {
  const iter = (items, space) => items.reduce((acc, i) => {
    if (i.status === 'parent') {
      const children = iter(i.children, space + 4);
      return `${acc}${' '.repeat(space)}${i.name}: {\n${children}${' '.repeat(space)}}\n`;
    }
    if (i.status === 'updated') {
      const remove = `${' '.repeat(space - 2)}- ${i.name}: ${getValue(i.value[0], space)}\n`;
      const add = `${' '.repeat(space - 2)}+ ${i.name}: ${getValue(i.value[1], space)}\n`;
      return `${acc}${remove}${add}`;
    }
    if (i.status === 'add') {
      return `${acc}${' '.repeat(space - 2)}+ ${i.name}: ${getValue(i.value, space)}\n`;
    }
    if (i.status === 'remove') {
      return `${acc}${' '.repeat(space - 2)}- ${i.name}: ${getValue(i.value, space)}\n`;
    }
    return `${acc}${' '.repeat(space)}${i.name}: ${i.value}\n`;
  }, '');
  const result = `{\n${iter(ast, 4)}}`;
  return result;
};
export default render;
