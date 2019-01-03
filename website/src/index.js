import './index.css';
import code from 'raw-loader!@codinsky/render-d3-dom'; // eslint-disable-line
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

const onChange = newCode => {
  sunburst(newCode, onMouseOver, onRadialScroll);
};

editor({ code, onChange });
