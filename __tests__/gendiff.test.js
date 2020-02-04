import genDiff from '../src';

const fs = require('fs');

test.each([
  [`${__dirname}/__fixtures__/firstconfig.json`, `${__dirname}/__fixtures__/secondconfig.json`, `${__dirname}/__fixtures__/resultconfig-tree.txt`],
  [`${__dirname}/__fixtures__/firstconfig.yaml`, `${__dirname}/__fixtures__/secondconfig.yaml`, `${__dirname}/__fixtures__/resultconfig-tree.txt`],
  [`${__dirname}/__fixtures__/firstconfig.ini`, `${__dirname}/__fixtures__/secondconfig.ini`, `${__dirname}/__fixtures__/resultconfig-tree.txt`],
])('compare config, result format tree', (firstPath, secondPath, expected) => {
  expect(genDiff(firstPath, secondPath, 'tree')).toEqual(fs.readFileSync(expected, 'UTF8'));
});

test.each([
  [`${__dirname}/__fixtures__/firstconfig.json`, `${__dirname}/__fixtures__/secondconfig.json`, `${__dirname}/__fixtures__/resultconfig-plain.txt`],
  [`${__dirname}/__fixtures__/firstconfig.yaml`, `${__dirname}/__fixtures__/secondconfig.yaml`, `${__dirname}/__fixtures__/resultconfig-plain.txt`],
  [`${__dirname}/__fixtures__/firstconfig.ini`, `${__dirname}/__fixtures__/secondconfig.ini`, `${__dirname}/__fixtures__/resultconfig-plain.txt`],
])('compare config, result format plain', (firstPath, secondPath, expected) => {
  expect(genDiff(firstPath, secondPath, 'plain')).toEqual(fs.readFileSync(expected, 'UTF8'));
});

test.each([
  [`${__dirname}/__fixtures__/firstconfig.json`, `${__dirname}/__fixtures__/secondconfig.json`, `${__dirname}/__fixtures__/resultconfig-json.txt`],
  [`${__dirname}/__fixtures__/firstconfig.yaml`, `${__dirname}/__fixtures__/secondconfig.yaml`, `${__dirname}/__fixtures__/resultconfig-json.txt`],
  [`${__dirname}/__fixtures__/firstconfig.ini`, `${__dirname}/__fixtures__/secondconfig.ini`, `${__dirname}/__fixtures__/resultconfig-json(ini).txt`],
])('compare config, result format json', (firstPath, secondPath, expected) => {
  expect(genDiff(firstPath, secondPath, 'json')).toEqual(fs.readFileSync(expected, 'UTF8'));
});
