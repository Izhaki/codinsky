import * as d3 from 'd3';
import getFillColour from './getFillColour';

const arcGenerator = d3
  .arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .innerRadius(d => d.y0)
  .outerRadius(d => d.y1);

export default (root, d3Element) => {
  // Data join
  const paths = d3Element.selectAll('path').data(root.descendants());

  // Update - update existing nodes
  paths
    .attr('d', arcGenerator)
    .style('fill', getFillColour)
    .style('stroke', '#fdf6e3');

  // Enter - create new nodes
  paths
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .style('fill', getFillColour)
    .style('stroke', '#fdf6e3');

  // Exit - remove unused nodes
  paths.exit().remove();
};
