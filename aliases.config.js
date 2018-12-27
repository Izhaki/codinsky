/* Used by webpack, babel and eslint */

const { resolve } = require('path');

const getPackageSourcePath = packageName =>
  resolve(__dirname, `packages/${packageName}/src`);

module.exports = {
  '@codinsky/core': resolve(__dirname, `packages/core`),
  '@codinsky/parse-js': getPackageSourcePath('parse'),
  '@codinsky/curate': getPackageSourcePath('curate'),
  '@codinsky/geometrify': getPackageSourcePath('geometrify'),
  '@codinsky/render-d3-dom': getPackageSourcePath('render'),
};
