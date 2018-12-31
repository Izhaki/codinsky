import * as d3 from 'd3';
import render from './render';
import resize from './resize';

// #sun-burst #outline
export default containerSelector => {
  const containerElement = d3.select(containerSelector);
  const svgElement = containerElement.append('svg');
  const outlineElement = svgElement.append('g');
  let previousRoot;
  let previousSize;
  return ({ root, size }) => {
    if (root && root !== previousRoot) {
      render(root, outlineElement);
      previousRoot = root;
    }
    if (size && size !== previousSize) {
      svgElement.attr('width', size).attr('height', size);
      resize(outlineElement, size);
      previousSize = size;
    }
  };
};
