const render = (ast) => {
  const iter = (items, space) => items.reduce((acc, i) => {
    if (i.status === 'parent') {
      return `${acc}${' '.repeat(space)}${i.name}: {\n${iter(i.children, space + 4)}${' '.repeat(space)}}\n`;
    }
    if (i.status === 'updated') {
      let remove = `${' '.repeat(space - 2)}- ${i.name}: ${i.value[0]}\n`;
      let add = `${' '.repeat(space - 2)}+ ${i.name}: ${i.value[1]}\n`;
      if (i.value[0] instanceof Object) {
        const keys = Object.keys(i.value[0]);
        const value = keys.reduce((ac, key) => `${ac}${' '.repeat(space + 4)}${key}: ${i.value[0][key]}\n`, '');
        remove = `${' '.repeat(space - 2)}- ${i.name}: {\n${value}${' '.repeat(space)}}\n`;
      } else if (i.value[1] instanceof Object) {
        const keys = Object.keys(i.value[1]);
        const value = keys.reduce((ac, k) => `${ac}${' '.repeat(space + 4)}${k}: ${i.value[1][k]}\n`, '');
        add = `${' '.repeat(space - 2)}+ ${i.name}: {\n${value}${' '.repeat(space)}}\n`;
      }
      return `${acc}${remove}${add}`;
    }
    if (i.status === 'add') {
      if (i.value instanceof Object) {
        const keys = Object.keys(i.value);
        const value = keys.reduce((ac, k) => `${ac}${' '.repeat(space + 4)}${k}: ${i.value[k]}\n`, '');
        return `${acc}${' '.repeat(space - 2)}+ ${i.name}: {\n${value}${' '.repeat(space)}}\n`;
      }
      return `${acc}${' '.repeat(space - 2)}+ ${i.name}: ${i.value}\n`;
    }
    if (i.status === 'remove') {
      if (i.value instanceof Object) {
        const keys = Object.keys(i.value);
        const value = keys.reduce((ac, k) => `${ac}${' '.repeat(space + 4)}${k}: ${i.value[k]}\n`,
          '');
        return `${acc}${' '.repeat(space - 2)}- ${i.name}: {\n${value}${' '.repeat(space)}}\n`;
      }
      return `${acc}${' '.repeat(space - 2)}- ${i.name}: ${i.value}\n`;
    }
    return `${acc}${' '.repeat(space)}${i.name}: ${i.value}\n`;
  }, '');
  return `{\n${iter(ast, 4)}}`;
};
export default render;
