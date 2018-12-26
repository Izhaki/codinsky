import * as d3 from 'd3';
import render from './render';
import resize from './resize';

export default (root, elementSelector, size) => {
  const d3Element = d3.select(elementSelector);
  render(root, d3Element);
  resize(d3Element, size);
};
