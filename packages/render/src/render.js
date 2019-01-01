import * as d3 from 'd3';
import getFillColour from './getFillColour';

const arcGenerator = d3
  .arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .innerRadius(d => d.y0)
  .outerRadius(d => d.y1);

const arc = (selection, onMouseOver) => {
  selection
    .attr('d', arcGenerator)
    .style('fill', getFillColour)
    .style('stroke', '#fdf6e3');

  if (onMouseOver) {
    selection.on('mouseover', onMouseOver);
  }
};

export default (root, d3Element, onMouseOver) => {
  // Data join
  const paths = d3Element.selectAll('path').data(root.descendants());

  // Update - update existing nodes
  arc(paths, onMouseOver);

  // Enter - create new nodes
  arc(paths.enter().append('path'), onMouseOver);

  // Exit - remove unused nodes
  paths.exit().remove();
};
