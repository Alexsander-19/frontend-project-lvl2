const fs = require('fs');
const ini = require('ini');

const firstConfig = ini.parse(fs.readFileSync('./__tests__/__fixtures__/firstconfig.ini', 'UTF8'));


console.log(firstConfig);