const plain = (ast) => {
  const iter = (items, ac) => items.reduce((acc, i) => {
    if (i.children) {
      return `${acc}${iter(i.children, `${ac}${i.name}.`)}`;
    }
    if (i.status === 'updated') {
      if (i.value[0] instanceof Object) {
        return `${acc}Property ${ac}${i.name} was updated. From [complex value] to ${i.value[1]}\n`;
      }
      if (i.value[1] instanceof Object) {
        return `${acc}Property ${ac}${i.name} was updated. From ${i.value[0]} to [complex value]\n`;
      }
      return `${acc}Property ${ac}${i.name} was updated. From ${i.value[0]} to ${i.value[1]}\n`;
    }
    if (i.status === 'add') {
      if (i.value instanceof Object) {
        return `${acc}Property ${ac}${i.name} was added with value: [complex value]\n`;
      }
      return `${acc}Property ${ac}${i.name} was added with value: ${i.value}\n`;
    }
    if (i.status === 'remove') {
      return `${acc}Property ${ac}${i.name} was removed\n`;
    }
    return acc;
  }, '');
  return iter(ast, '').trim();
};

export default plain;
