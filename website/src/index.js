import './index.css';
import { pipe } from '@codinsky/core'; // eslint-disable-line import/no-extraneous-dependencies
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

const root = pipe(
  parse,
  curate,
  geometrify,
)(code);

render(root, '#sun-burst #outline', size);
