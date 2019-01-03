import * as d3 from 'd3';
import doRender from './render';
import doResize from './resize';

export default containerSelector => {
  const containerElement = d3.select(containerSelector);
  const svgElement = containerElement.append('svg');
  const outlineElement = svgElement.append('g');

  const resize = size => {
    svgElement.attr('width', size).attr('height', size);
    doResize(outlineElement, size);
  };

  const render = ({ root, size, onMouseOver }) => {
    doRender(root, outlineElement, onMouseOver);
    resize(size);
  };
  return { render, resize };
};
