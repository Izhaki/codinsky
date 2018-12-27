import './index.css';
import sunburst from './sunburst';
import * as editor from './editor';

const code = `
if (a)
  doSomething()
`;

sunburst(code);
editor.setCode(code);
