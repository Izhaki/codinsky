import * as d3 from 'd3';

const arcGenerator = d3
  .arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .innerRadius(d => d.y0)
  .outerRadius(d => d.y1);

const isDefined = x => x !== undefined;

const getArcClass = d =>
  [d.data.category, d.data.subCategory].filter(isDefined).join(' ') ||
  undefined;

const arc = (selection, onMouseOver) => {
  selection.attr('d', arcGenerator).attr('class', getArcClass);

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
