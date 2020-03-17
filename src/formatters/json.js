const render = (ast) => {
  const iter = (items) => items.reduce((acc, item) => {
    if (item.status === 'parent') {
      return [...acc, {
        name: item.name, status: item.status, value: item.value, children: iter(item.children),
      }];
    }
    if (item.status === 'updated') {
      return [...acc, { name: item.name, status: item.status, value: [...item.value] }];
    }
    if (item.status === 'add') {
      return [...acc, { name: item.name, status: item.status, value: item.value }];
    }
    if (item.status === 'remove') {
      return [...acc, { name: item.name, status: item.status, value: item.value }];
    }
    return acc;
  }, []);
  const result = iter(ast);
  return JSON.stringify(result);
};

export default render;
