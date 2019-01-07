import * as d3 from 'd3';
import doRender from './render';
import getTransform from './getTransform';
import radialHitTest from './radialHitTest';
import getStyle from './getStyle';

export default containerSelector => {
  const containerElement = d3.select(containerSelector);
  const svgElement = containerElement.append('svg');
  const sunburstElement = svgElement.append('g');

  sunburstElement.append('style').text(getStyle());

  let transform;

  const resize = size => {
    svgElement.attr('width', size).attr('height', size);
    transform = getTransform(sunburstElement, size);
    const { scale, translate } = transform;

    sunburstElement.attr(
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
    doRender(root, sunburstElement, onMouseOver);
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
