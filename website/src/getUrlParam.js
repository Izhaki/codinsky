export default paramName => {
  const name = paramName.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(window.location.search);
  return results === null
    ? undefined
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
