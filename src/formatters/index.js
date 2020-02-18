import tree from './tree';
import plain from './plain';
import json from './json';

const render = (ast, format) => {
  if (format === 'tree') {
    return tree(ast);
  }
  if (format === 'plain') {
    return plain(ast);
  }
  if (format === 'json') {
    return json(ast);
  }
  return null;
};

export default render;
