import { pipe } from '@codinsky/core'; // eslint-disable-line import/no-extraneous-dependencies
import parse from '@codinsky/parse-js';
import curate from '@codinsky/curate';
import geometrify from '@codinsky/geometrify';
import getRender from '@codinsky/render-d3-dom';
import getVisualisationSize from './getVisualisationSize';
import onWindowResize from './optimizedResize';

const render = getRender('#sun-burst #outline');

const setSize = (elementId, size) => {
  const { style } = document.getElementById(elementId);
  style.width = size;
  style.height = size;
};

let size = getVisualisationSize();
setSize('sun-burst', size);

const resizeSVG = () => {
  size = getVisualisationSize();
  setSize('sun-burst', size);
  render({ size });
};

onWindowResize(resizeSVG);

export default code => {
  const root = pipe(
    parse,
    curate,
    geometrify,
  )(code);

  render({ root, size });
};
