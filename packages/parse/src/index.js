import { parse } from '@babel/parser';
import normalise from './normalise';

const baseOptions = {
  sourceType: 'unambiguous',
};

const basePlugins = [
  'asyncGenerators',
  'bigInt',
  'classProperties',
  ['decorators', { decoratorsBeforeExport: false }],
  'dynamicImport',
  'exportDefaultFrom',
  'jsx',
  'objectRestSpread',
];

const tsx = {
  ...baseOptions,
  plugins: [...basePlugins, 'typescript'],
};

const jsx = {
  ...baseOptions,
  plugins: [...basePlugins, 'flow'],
};

export default source => {
  let ast;

  for (const options of [tsx, jsx]) {
    try {
      ast = parse(source, options);
    } catch (error) {
      /* Do nothing */
    }
  }
  return normalise(ast);
};
