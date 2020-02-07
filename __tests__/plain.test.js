import genDiff from '../src';

const fs = require('fs');

const template = [
  [
    `${__dirname}/__fixtures__/firstconfig.json`,
    `${__dirname}/__fixtures__/secondconfig.json`,
    `${__dirname}/__fixtures__/resultconfig-plain.txt`,
  ],
  [
    `${__dirname}/__fixtures__/firstconfig.yaml`,
    `${__dirname}/__fixtures__/secondconfig.yaml`,
    `${__dirname}/__fixtures__/resultconfig-plain.txt`,
  ],
  [
    `${__dirname}/__fixtures__/firstconfig.ini`,
    `${__dirname}/__fixtures__/secondconfig.ini`,
    `${__dirname}/__fixtures__/resultconfig-plain.txt`,
  ],
];

test.each(template)('compare config, result format plain', (firstPath, secondPath, expected) => {
  expect(genDiff(firstPath, secondPath, 'plain')).toEqual(fs.readFileSync(expected, 'UTF8'));
});
