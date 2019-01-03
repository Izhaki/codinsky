import * as d3 from 'd3';
import doRender from './render';
import getTransform from './getTransform';
import radialHitTest from './radialHitTest';

export default containerSelector => {
  const containerElement = d3.select(containerSelector);
  const svgElement = containerElement.append('svg');
  const outlineElement = svgElement.append('g');

  let transform;

  const resize = size => {
    svgElement.attr('width', size).attr('height', size);
    transform = getTransform(outlineElement, size);
    const { scale, translate } = transform;

    outlineElement.attr(
      'transform',
      `
      translate(
        ${translate.x},
        ${translate.y}
      )
      scale(${scale})
      `,
    );
  };

  const render = ({ root, size, onMouseOver, onRadialScroll }) => {
    doRender(root, outlineElement, onMouseOver);
    resize(size);

    if (onRadialScroll) {
      // Add/Replace listener
      svgElement.on('mousemove', function onMouseMove() {
        const [x, y] = d3.mouse(this);
        const arc = radialHitTest({
          mouse: { x, y },
          center: transform.translate,
          root,
        });
        onRadialScroll(arc);
      });
    } else {
      // Remove listener
      svgElement.on('mousemove', null);
    }
  };
  return { render, resize };
};
