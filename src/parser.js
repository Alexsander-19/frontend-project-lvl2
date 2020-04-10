import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, typeFile) => {
  switch (typeFile) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.safeLoad(data);
    case 'ini':
      return ini.parse(data);
    default:
      return null;
  }
};

export default parse;
