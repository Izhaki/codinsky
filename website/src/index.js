import './index.css';
import sunburst from './sunburst';
import editor, { setSelection, scrollTo } from './editor';

const onMouseOver = d => {
  const { loc } = d.data;
  if (loc) {
    setSelection(loc);
  }
};

const onRadialScroll = d => {
  scrollTo(d.data.loc);
};

const onChange = code => {
  sunburst(code, onMouseOver, onRadialScroll);
};

const code = `
if (a)
  doSomething()
`;

editor({ code, onChange });
