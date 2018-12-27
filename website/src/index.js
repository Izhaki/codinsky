import './index.css';
import sunburst from './sunburst';
import editor from './editor';

const onChange = code => {
  sunburst(code);
};

const code = `
if (a)
  doSomething()
`;

editor({ code, onChange });
