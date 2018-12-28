import { pipe } from '@codinsky/core'; // eslint-disable-line import/no-extraneous-dependencies
import parse from '@codinsky/parse-js';
import curate from '@codinsky/curate';
import geometrify from '@codinsky/geometrify';
import render from '@codinsky/render-d3-dom';
import getVisualisationSize from './getVisualisationSize';
import onWindowResize from './optimizedResize';

const setSize = (elementId, size) => {
  const { style } = document.getElementById(elementId);
  style.width = size;
  style.height = size;
};

let size = getVisualisationSize();
setSize('sun-burst', size);
let root;

const update = () => {
  render(root, '#sun-burst #outline', size);
};

const resizeSVG = () => {
  size = getVisualisationSize();
  setSize('sun-burst', size);
  update();
};

onWindowResize(resizeSVG);

export default code => {
  root = pipe(
    parse,
    curate,
    geometrify,
  )(code);

  update();
};
