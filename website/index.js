import './index.css';
import parse from '@codinsky/parse-js';
import curate from '@codinsky/curate';

const code = `
if (a)
  doSomething()
`;

const ast = curate(parse(code));
console.log(ast);
