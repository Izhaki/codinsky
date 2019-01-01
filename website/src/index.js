import './index.css';
import sunburst from './sunburst';
import editor, { setSelection } from './editor';

const onMouseOver = d => {
  const { loc } = d.data;
  if (loc) {
    setSelection(loc);
  }
};

const onChange = code => {
  sunburst(code, onMouseOver);
};

const code = `
if (a)
  doSomething()
`;

editor({ code, onChange });
