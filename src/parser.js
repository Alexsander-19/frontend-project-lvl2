import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, type) => {
  const result = {};
  if (type === '.json') {
    return JSON.parse(data);
  }
  if (type === '.yaml') {
    return yaml.safeLoad(data);
  }
  if (type === '.ini') {
    return ini.parse(data);
  }
  return result;
};

export default parse;
