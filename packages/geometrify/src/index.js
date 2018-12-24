import * as d3 from 'd3';
import compress from './compress';

// If a node has children we return 0 so it is the sum of all its descendents.
// Leaf nodes get size 1.
const getNodeSize = d => (d.children && d.children.length ? 0 : 1);

export default ast => {
  const rootNode = d3.hierarchy(ast);

  rootNode.sum(getNodeSize);

  // By default visualisations are 1000px width and height.
  const radius = 1000;
  const partitionLayout = d3.partition().size([2 * Math.PI, radius]);

  partitionLayout(rootNode);
  compress(rootNode);

  return rootNode;
};
