import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'ini':
      return ini.parse(data);
    default:
      throw new TypeError(`unknown data type - '${dataType}'`);
  }
};

export default parse;
