const getAngle = (p1, p2) => {
  const { PI } = Math;
  const angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  const angleNorth = angleRadians + PI / 2;
  const anglePositive = angleNorth + PI;
  const angle = anglePositive % (PI * 2); // Get it in range of 2π.
  return angle;
};

export default ({ mouse, center, root }) => {
  const angle = getAngle(mouse, center);

  const hitTest = node => {
    const { x0, x1, children } = node;
    if (angle >= x0 && angle <= x1) {
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          const hit = hitTest(child);
          if (hit) {
            return hit;
          }
        }
      }
      return node;
    }
    return null;
  };

  return hitTest(root);
};
