import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const templates = [
  [
    'before.json',
    'after.json',
  ],
  [
    'before.yaml',
    'after.yaml',
  ],
  [
    'before.ini',
    'after.ini',
  ],
];

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'UTF-8');

test.each(templates)('compare config, result format - json', (firstPath, secondPath) => {
  expect(genDiff(getFixturePath(firstPath), getFixturePath(secondPath), 'json')).toEqual(readFile('result-json.txt'));
});

test.each(templates)('compare config, result format - plain', (firstPath, secondPath) => {
  expect(genDiff(getFixturePath(firstPath), getFixturePath(secondPath), 'plain')).toEqual(readFile('result-plain.txt'));
});

test.each(templates)('compare config, result format - tree', (firstPath, secondPath) => {
  expect(genDiff(getFixturePath(firstPath), getFixturePath(secondPath), 'tree')).toEqual(readFile('result-tree.txt'));
});
