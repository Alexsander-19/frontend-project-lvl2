import tree from './tree';
import plain from './plain';
import formatJSON from './json';

const render = (ast, format) => {
  if (format === 'tree') {
    return tree(ast);
  }
  if (format === 'plain') {
    return plain(ast);
  }
  if (format === 'json') {
    return formatJSON(ast);
  }
  return null;
};

export default render;
