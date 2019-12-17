import genDiff from '../src';

const fs = require('fs');

test('compare configs', () => {
  expect(genDiff(`${__dirname}/__fixtures__/firstconfig.json`, `${__dirname}/__fixtures__/secondconfig.json`))
    .toEqual(fs.readFileSync(`${__dirname}/__fixtures__/resultconfig.txt`, 'utf8'));
});
