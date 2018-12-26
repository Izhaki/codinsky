export default (d3Element, size) => {
  const { x, y, width, height } = d3Element.node().getBBox();

  const paddedSize = size - 20; // 20px padding
  const scale = Math.min(paddedSize / width, paddedSize / height);
  const xCenter = (-x * size) / width;
  const yCenter = (-y * size) / height;

  d3Element.attr(
    'transform',
    `translate(
      ${xCenter},
      ${yCenter}
    )
    scale(${scale})`,
  );
};
