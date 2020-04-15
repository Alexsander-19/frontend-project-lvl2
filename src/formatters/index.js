import tree from './tree';
import plain from './plain';
import json from './json';

const render = (ast, format) => {
  switch (format) {
    case 'tree':
      return tree(ast);
    case 'plain':
      return plain(ast);
    case 'json':
      return json(ast);
    default:
      throw new TypeError(`unknow output format - '${format}'`);
  }
};

export default render;
