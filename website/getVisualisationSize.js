const getviewPortSize = () => ({
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  height: Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0,
  ),
});

export default () => {
  const { width, height } = getviewPortSize();
  return Math.min(width, height);
};
