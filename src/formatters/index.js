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
      return null;
  }
};

export default render;
