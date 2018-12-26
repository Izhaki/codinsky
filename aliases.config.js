/* Used by webpack, babel and eslint */

const path = require('path');

const getPackageSourcePath = packageName =>
  path.resolve(__dirname, `packages/${packageName}/src`);

module.exports = {
  '@codinsky/parse-js': getPackageSourcePath('parse'),
  '@codinsky/curate': getPackageSourcePath('curate'),
  '@codinsky/geometrify': getPackageSourcePath('geometrify'),
  '@codinsky/render-d3-dom': getPackageSourcePath('render'),
};
