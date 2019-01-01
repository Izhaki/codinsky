import * as d3 from 'd3';
import render from './render';
import resize from './resize';

export default containerSelector => {
  const containerElement = d3.select(containerSelector);
  const svgElement = containerElement.append('svg');
  const outlineElement = svgElement.append('g');
  let previousRoot;
  let previousSize;
  return ({ root, size, onMouseOver }) => {
    const newRoot = root && root !== previousRoot;
    if (newRoot) {
      render(root, outlineElement, onMouseOver);
      previousRoot = root;
    }
    const newSize = size && size !== previousSize;
    if (newSize || newRoot) {
      svgElement.attr('width', size).attr('height', size);
      resize(outlineElement, size);
      previousSize = size;
    }
  };
};
