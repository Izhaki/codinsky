export default root => {
  const isBlock = node => node.data.type === 'BlockStatement';
  const isExport = node => node.data.category === 'export';
  const compressNode = (delta, parent) => node => {
    node.y0 -= delta;
    node.y1 -= delta;
    let blockRatio = 1;
    let newDelta = delta;
    if (isBlock(node)) {
      blockRatio = 1 / 5;
    }
    if (parent && isBlock(parent)) {
      blockRatio = 4 / 5;
    }
    if (blockRatio !== 1) {
      const length = node.y1 - node.y0;
      const newLength = length * blockRatio;
      node.y1 = node.y0 + newLength;
      newDelta += length - newLength;
    }

    // Exports are pushed into the core area.
    // Note that exports are always children of the root node
    if (isExport(node)) {
      const length = node.y1 - node.y0;
      // Set the end radius to be that of the begining
      node.y1 = node.y0;
      // Set the begining to be a fifth of the original block size
      node.y0 -= length / 10;
      newDelta += length;
    }

    if (node.children) {
      node.children.forEach(compressNode(newDelta, node));
    }
  };
  compressNode(0)(root);
};
