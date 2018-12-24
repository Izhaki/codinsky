import './index.css';
import parse from '@codinsky/parse-js';
import curate from '@codinsky/curate';
import geometrify from '@codinsky/geometrify';

const code = `
if (a)
  doSomething()
`;

const ast = geometrify(curate(parse(code)));
console.log(ast);
