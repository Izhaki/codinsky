import './index.css';
import parse from '@codinsky/parse-js';
import curate from '@codinsky/curate';
import geometrify from '@codinsky/geometrify';
import render from '@codinsky/render-d3-dom';
import getVisualisationSize from './getVisualisationSize';

const setSize = (elementId, size) => {
  const { style } = document.getElementById(elementId);
  style.width = size;
  style.height = size;
};

const size = getVisualisationSize();
setSize('sun-burst', size);

const code = `
if (a)
  doSomething()
`;

const root = geometrify(curate(parse(code)));
render(root, '#sun-burst #outline', size);
