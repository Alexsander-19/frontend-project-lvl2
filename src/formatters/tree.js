import { isObject } from 'lodash';

const render = (ast) => {
  const getValue = (obj, space) => {
    const keys = Object.keys(obj);
    const value = keys.map((key) => `${' '.repeat(space + 4)}${key}: ${obj[key]}\n`);
    return `{\n${value.join('')}${' '.repeat(space)}}`;
  };
  const iter = (items, space) => items.reduce((acc, i) => {
    if (i.status === 'parent') {
      return `${acc}${' '.repeat(space)}${i.name}: {\n${iter(i.children, space + 4)}${' '.repeat(space)}}\n`;
    }
    if (i.status === 'updated') {
      const value1 = isObject(i.value[0]) ? getValue(i.value[0], space) : i.value[0];
      const value2 = isObject(i.value[1]) ? getValue(i.value[1], space) : i.value[1];
      const remove = `${' '.repeat(space - 2)}- ${i.name}: ${value1}\n`;
      const add = `${' '.repeat(space - 2)}+ ${i.name}: ${value2}\n`;
      return `${acc}${remove}${add}`;
    }
    if (i.status === 'add') {
      const value = isObject(i.value) ? getValue(i.value, space) : i.value;
      return `${acc}${' '.repeat(space - 2)}+ ${i.name}: ${value}\n`;
    }
    if (i.status === 'remove') {
      const value = isObject(i.value) ? getValue(i.value, space) : i.value;
      return `${acc}${' '.repeat(space - 2)}- ${i.name}: ${value}\n`;
    }
    return `${acc}${' '.repeat(space)}${i.name}: ${i.value}\n`;
  }, '');
  const result = `{\n${iter(ast, 4)}}`;
  return result;
};
export default render;
