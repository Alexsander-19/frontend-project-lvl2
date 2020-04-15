#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv)
  .action((firstConfig, secondConfig) => {
    try {
      console.log(genDiff(firstConfig, secondConfig, program.format));
    } catch (err) {
      console.log(err.name, err.message);
    }
  })
  .parse(process.argv);
