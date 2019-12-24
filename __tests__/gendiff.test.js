import genDiff from '../src';

const fs = require('fs');

test.each([
  [`${__dirname}/__fixtures__/firstconfig.json`, `${__dirname}/__fixtures__/secondconfig.json`, `${__dirname}/__fixtures__/resultconfig.txt`],
  [`${__dirname}/__fixtures__/firstconfig.yaml`, `${__dirname}/__fixtures__/secondconfig.yaml`, `${__dirname}/__fixtures__/resultconfig.txt`],
  [`${__dirname}/__fixtures__/firstconfig.ini`, `${__dirname}/__fixtures__/secondconfig.ini`, `${__dirname}/__fixtures__/resultconfig.txt`],
])('compare config', (firstPath, secondPath, expected) => {
  expect(genDiff(firstPath, secondPath)).toEqual(fs.readFileSync(expected, 'UTF8'));
});
