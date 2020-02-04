const fs = require('fs');

const render = (ast) => {
  const iter = (items) => items.reduce((acc, item) => {
    if (item.children) {
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
  fs.writeFileSync('/home/alex/projects/test/te.json', JSON.stringify(iter(ast)));
  return JSON.stringify(iter(ast));
};

export default render;
