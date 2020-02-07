import parser from '../src/parser';

const fs = require('fs');

const template = [
  [
    `${__dirname}/__fixtures__/firstconfig.json`,
    `${__dirname}/__fixtures__/secondconfig.json`,
    `${__dirname}/__fixtures__/resultparser.txt`,
  ],
  [
    `${__dirname}/__fixtures__/firstconfig.yaml`,
    `${__dirname}/__fixtures__/secondconfig.yaml`,
    `${__dirname}/__fixtures__/resultparser.txt`,
  ],
  [
    `${__dirname}/__fixtures__/firstconfig.ini`,
    `${__dirname}/__fixtures__/secondconfig.ini`,
    `${__dirname}/__fixtures__/resultparser.txt`,
  ],
];

test.each(template)('parser result is object', (firstPath, secondPath) => {
  expect(parser(firstPath, secondPath)).toBeInstanceOf(Object);
});

test.each(template)('parse config file', (firstPath, secondPath, expected) => {
  expect(parser(firstPath, secondPath)).toEqual(JSON.parse(fs.readFileSync(expected, 'UTF8')));
});
