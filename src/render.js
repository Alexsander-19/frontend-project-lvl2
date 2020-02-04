const render = (ast) => {
  const renderIter = (astr, space1, space2) => astr.reduce((acc, i) => {
    if (i.children && i.status === 'parent') {
      return `${acc}${' '.repeat(space2)}${i.name}: {\n${renderIter(i.children, space1 + 4, space2 + 4)}${' '.repeat(space2)}}\n`;
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
  return `{\n${renderIter(ast, 2, 4)}}`;
};
export default render;
