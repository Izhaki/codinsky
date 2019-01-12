import './index.css';
import sunburst from './sunburst';
import editor, { setSelection, scrollTo } from './editor';
import getUrlParam from './getUrlParam';

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

const loadCode = async () => {
  const defaultSourceUri =
    'https://raw.githubusercontent.com/Izhaki/codinsky/master/packages/render/src/index.js';
  const sourceUri = getUrlParam('sourceUri') || defaultSourceUri;

  const response = await fetch(sourceUri);
  const code = await response.text();
  editor({ code, onChange });
};

loadCode();
