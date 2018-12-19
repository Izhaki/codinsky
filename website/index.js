import './index.css';
import parse from '@codinsky/parse-js';

const code = `
if (a)
  doSomething()
`;

const ast = parse(code);
console.log(ast);
