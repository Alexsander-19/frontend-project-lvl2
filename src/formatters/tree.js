const render = (ast) => {
  const iter = (items, space1, space2) => items.reduce((acc, i) => {
    if (i.children) {
      return `${acc}${' '.repeat(space2)}${i.name}: {\n${iter(i.children, space1 + 4, space2 + 4)}${' '.repeat(space2)}}\n`;
    }
    if (i.status === 'updated') {
      let remove = `${' '.repeat(space1)}- ${i.name}: ${i.value[0]}\n`;
      let add = `${' '.repeat(space1)}+ ${i.name}: ${i.value[1]}\n`;
      if (i.value[0] instanceof Object) {
        const valueKeys = Object.keys(i.value[0]);
        const value = valueKeys.reduce((ac, key) => `${ac}${' '.repeat(space2 + 4)}${key}: ${i.value[0][key]}\n`, '');
        remove = `${' '.repeat(space1)}- ${i.name}: {\n${value}${' '.repeat(space2)}}\n`;
      } else if (i.value[1] instanceof Object) {
        const valueKeys = Object.keys(i.value[1]);
        const value = valueKeys.reduce((ac, k) => `${ac}${' '.repeat(space2 + 4)}${k}: ${i.value[1][k]}\n`, '');
        add = `${' '.repeat(space1)}+ ${i.name}: {\n${value}${' '.repeat(space2)}}\n`;
      }
      return `${acc}${remove}${add}`;
    }
    if (i.status === 'add') {
      if (i.value instanceof Object) {
        const valueKeys = Object.keys(i.value);
        const value = valueKeys.reduce((ac, k) => `${ac}${' '.repeat(space2 + 4)}${k}: ${i.value[k]}\n`, '');
        return `${acc}${' '.repeat(space1)}+ ${i.name}: {\n${value}${' '.repeat(space2)}}\n`;
      }
      return `${acc}${' '.repeat(space1)}+ ${i.name}: ${i.value}\n`;
    }
    if (i.status === 'remove') {
      if (i.value instanceof Object) {
        const valueKeys = Object.keys(i.value);
        const value = valueKeys.reduce((ac, k) => `${ac}${' '.repeat(space2 + 4)}${k}: ${i.value[k]}\n`,
          '');
        return `${acc}${' '.repeat(space1)}- ${i.name}: {\n${value}${' '.repeat(space2)}}\n`;
      }
      return `${acc}${' '.repeat(space1)}- ${i.name}: ${i.value}\n`;
    }
    return `${acc}${' '.repeat(space2)}${i.name}: ${i.value}\n`;
  }, '');
  return `{\n${iter(ast, 2, 4)}}`;
};
export default render;
