import babel from 'rollup-plugin-babel';
// import nodeResolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';

const input = 'src/parse.js';

const cjs = [
  {
    input,
    output: { file: 'dist/cjs/index.js', format: 'cjs' },
    plugins: [babel()],
  },
];

const esm = [
  {
    input,
    output: { file: 'dist/esm/index.js', format: 'esm' },
    plugins: [
      babel({
        exclude: /node_modules/,
      }),
    ],
  },
];

export default cjs.concat(esm);
