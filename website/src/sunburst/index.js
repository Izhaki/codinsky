import { pipe } from '@codinsky/core'; // eslint-disable-line import/no-extraneous-dependencies
import parse from '@codinsky/parse-js';
import curate from '@codinsky/curate';
import geometrify from '@codinsky/geometrify';
import getRender from '@codinsky/render-d3-dom';
import getVisualisationSize from './getVisualisationSize';
import onWindowResize from './optimizedResize';

const render = getRender('#codinsky');

const renderSized = root => {
  const size = getVisualisationSize();
  render({ root, size });
};

onWindowResize(renderSized);

export default code => {
  const root = pipe(
    parse,
    curate,
    geometrify,
  )(code);

  renderSized(root);
};
