import * as d3 from 'd3';
import getFillColour from './getFillColour';

const arcGenerator = d3
  .arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .innerRadius(d => d.y0)
  .outerRadius(d => d.y1);

export default (root, d3Element) => {
  d3Element
    .selectAll('path')
    .data(root.descendants())
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .style('fill', getFillColour)
    .style('stroke', '#fdf6e3');
};
