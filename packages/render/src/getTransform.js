export default (d3Element, size) => {
  const { x, y, width, height } = d3Element.node().getBBox();

  const paddedSize = size - 20; // 20px padding

  return {
    scale: Math.min(paddedSize / width, paddedSize / height),
    translate: {
      x: (-x * size) / width,
      y: (-y * size) / height,
    },
  };
};
