const fs = require('fs');
const ini = require('ini');
const _ = require('lodash');

// const config = JSON.parse(fs.readFileSync('./test.json', 'UTF8'));


const obj = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: { key: 'value' },
  },
  group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
  group2: { abc: 12345 },
};

const obj2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: { key: 'value' },
    setting4: 'blah blah',
    setting5: { key5: 'value5' },
    setting6: { key: 'value', ops: 'vops' },
  },
  group1: { foo: 'bar', baz: 'bars', nest: 'str' },
  group3: { fee: 100500 },
};


const iter = (o) => {
  const keys = Object.keys(o);
  return keys.reduce((acc, i) => {
    if (typeof o[i] === 'object') {
      return [...acc, iter(o[i])];
    }
    return [...acc, i];
  }, keys);
}

const keys = Array.from(new Set([..._.flattenDeep(iter(obj)), ..._.flattenDeep(iter(obj2))]));

const iter2 = (ob1, ob2) => {
  return keys.reduce((acc, i) => {
    if (_.has(ob1, i) && _.has(ob2, i)) {
      if (ob1[i] instanceof Object && ob2[i] instanceof Object) {
        const conf = { name: i, status: 'parent', value: '', children: iter2(ob1[i], ob2[i]) };
        return [ ...acc, conf ];
      }
      if (ob1[i] === ob2[i]) {
        const conf = { name: i, status: 'no', value: ob1[i] };
        return [ ...acc, conf ];
      }
      const addConf = { name: i, status: 'add', value: ob2[i] };
      const remConf = { name: i, status: 'remove', value: ob1[i] };
      return [ ...acc, addConf, remConf ];
    }
    if (_.has(ob1, i)) {
      const addConf = { name: i, status: 'remove', value: ob1[i] };
      return [ ...acc, addConf ];
    }
    if (_.has(ob2, i)) {
      const remConf = { name: i, status: 'add', value: ob2[i] };
      return [ ...acc, remConf ];
    }
    return acc;
  }, []);
}

const result = iter2(obj, obj2);

const renderIter = (astr, space1, space2) => {
  return astr.reduce((acc, i) => {
    if (i.children && i.status === 'parent') {
      return `${acc}${' '.repeat(space2)}${i.name}: {\n${renderIter(i.children, space1 + 4, space2 + 4)}${' '.repeat(space2)}}\n`;
    }
    if (i.status === 'add') {
      if (i.value instanceof Object) {
        const valueKeys = Object.keys(i.value);
        const value = valueKeys.reduce((ac, k) => {
          return `${ac}${' '.repeat(space2 + 4)}${k}: ${i.value[k]}\n`;
        }, '');
        return `${acc}${' '.repeat(space1)}+ ${i.name}: {\n${value}${' '.repeat(space2)}}\n`;
      }
      return `${acc}${' '.repeat(space1)}+ ${i.name}: ${i.value}\n`;
    }
    if (i.status === 'remove') {
      if (i.value instanceof Object) {
        const valueKeys = Object.keys(i.value);
        const value = valueKeys.reduce((ac, k) => {
          return `${ac}${' '.repeat(space2 + 4)}${k}: ${i.value[k]}\n`;
        }, '');
        return `${acc}${' '.repeat(space1)}- ${i.name}: {\n${value}${' '.repeat(space2)}}\n`;
      }
      return `${acc}${' '.repeat(space1)}- ${i.name}: ${i.value}\n`;
    }
    return `${acc}${' '.repeat(space2)}${i.name}: ${i.value}\n`;
  }, '');
};

console.log(`{\n${renderIter(result, 2, 4)}}`);