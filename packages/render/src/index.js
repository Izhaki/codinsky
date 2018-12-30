import * as d3 from 'd3';
import render from './render';
import resize from './resize';

export default elementSelector => {
  const d3Element = d3.select(elementSelector);
  let previousRoot;
  let previousSize;
  return ({ root, size }) => {
    if (root && root !== previousRoot) {
      render(root, d3Element);
      previousRoot = root;
    }
    if (size && size !== previousSize) {
      resize(d3Element, size);
      previousSize = size;
    }
  };
};
