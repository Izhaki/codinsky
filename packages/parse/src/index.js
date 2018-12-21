import { parse } from '@babel/parser';
import normalise from './normalise';

const options = {
  // parse in strict mode and allow module declarations
  sourceType: 'module',

  plugins: [
    // enable jsx and flow syntax
    //    'jsx',
    'flow',
    // 'typescript',
  ],
};

export default source => {
  const ast = parse(source, options);
  return normalise(ast);
};
